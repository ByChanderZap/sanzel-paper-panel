"use server"

import { OrderFormState, OrderStatusFormState } from "@/types/orders"
import { CreateOrderSchema, UpdateOrderStatus } from "@/validationSchemas/orders"
import { updateOrderStatus, validateAndCreateOrderDetailed } from "@/lib/orders/orders"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const createOrderAction = async (prevState: OrderFormState, formData: FormData): Promise<OrderFormState> => {
  try {
    const orderItemsRaw = formData.get('orderItems') as string
    const discount = formData.get('discount') as string
    const orderItems = JSON.parse(orderItemsRaw)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedOrderItems = orderItems.map((item: any) => ({
      ...item,
      quantity: parseInt(item.quantity),
      width: parseFloat(item.width),
      linear_size: parseFloat(item.linear_size),
      unit_price: parseFloat(item.unit_price),
      itemTotal: parseFloat(item.itemTotal)
    }))

    const validatedFields = await CreateOrderSchema.safeParseAsync({
      clientId: formData.get('clientId'),
      vendorId: formData.get('vendorId'),
      status: formData.get('status')?.toString().toUpperCase() as string,
      orderItems: parsedOrderItems,
      orderTotal: parseFloat(formData.get('orderTotal') as string)
    })

    
    
    if (!validatedFields.success) {
      return {
        ...prevState,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation error'
      }
    }
    const discountInt = parseInt(discount) || 0
    const { data } = validatedFields
    await validateAndCreateOrderDetailed({
      clientId: data.clientId,
      vendorId: data.vendorId,
      orderTotal: discountInt > 0 ? data.orderTotal * (1 - discountInt / 100) : data.orderTotal,
      status: data.status,
      discount: discountInt,
      orderItems: data.orderItems.map((item) => ({
        quantity: item.quantity,
        item_total: item.itemTotal,
        linear_size: item.linear_size,
        width: item.width,
        unit_price: Math.round(item.unit_price * 100), // Convert to cents/integer
        productId: item.productId,
      }))
    })
  } catch(error) {
    console.error("Error while creating order:", error)
    return {
      ...prevState,
      message: 'Failed to create order',
      success: false,
      errors: {}
    }
  }
  revalidatePath('/orders')
  revalidatePath('/dashboard')
  redirect('/orders')
}

export const updateOrderStatusAction = async (prevState: OrderStatusFormState, formData: FormData): Promise<OrderStatusFormState> => {
  const validatedFields = await UpdateOrderStatus.safeParseAsync({
    id: formData.get('id'),
    status: formData.get('status')
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation error'
    }
  }

  const { data } = validatedFields
  try {
    await updateOrderStatus(data.id, data.status)
    revalidatePath('/orders')
    revalidatePath(`/orders/${data.id}/summary`)
    return {
      message: "Status updated successfully",
      success: true
    }
  } catch(error) {
    console.error(error)
    return {
      message: "Something went wrong while updating the status",
      success: false
    }
  }
}
