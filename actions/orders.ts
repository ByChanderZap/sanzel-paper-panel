"use server"

import { OrderFormState, OrderStatusFormState } from "@/types/orders"
import { CreateOrderSchema, UpdateOrderStatus } from "@/validationSchemas/orders"
import { updateOrderStatus, validateAndCreateOrderDetailed } from "@/lib/orders/orders"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const createOrderAction = async (prevState: OrderFormState, formData: FormData): Promise<OrderFormState> => {
  console.log('Creating order')
  console.log(formData)
  try {
    const orderItemsRaw = formData.get('orderItems') as string
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
    const { data } = validatedFields
    await validateAndCreateOrderDetailed({
      clientId: data.clientId,
      vendorId: data.vendorId,
      orderTotal: data.orderTotal,
      status: data.status,
      orderItems: data.orderItems.map((item) => ({
        quantity: item.quantity,
        item_total: item.itemTotal,
        linear_size: item.linear_size,
        width: item.width,
        unit_price: Math.round(item.unit_price * 100), // Convert to cents/integer
        productId: item.productId,
      }))
    })

    //  return {
      //   ...prevState,
      //   message: 'Order created successfully',
      //   success: true,
      //   errors: {}
      // }
    } catch(error) {
      console.error("Error while creating order:", error)
      return {
        ...prevState,
        message: 'Failed to create order',
        success: false,
        errors: {}
      }
    }
    console.log('Order created successfully')
    revalidatePath('/orders')
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
