"use server"

import { OrderFormState } from "@/types/orders"
import { CreateOrderSchema } from "@/validationSchemas/orders"
import { validateAndCreateOrderDetailed } from "@/lib/orders/orders"

export const createOrderAction = async (prevState: OrderFormState, formData: FormData): Promise<OrderFormState> => {

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
    console.log(parsedOrderItems)
    const validatedFields = await CreateOrderSchema.safeParseAsync({
      clientId: formData.get('clientId'),
      status: formData.get('status')?.toString().toUpperCase() as string,
      orderItems: parsedOrderItems,
      orderTotal: parseFloat(formData.get('orderTotal') as string)
    })

    
    
    if (!validatedFields.success) {
      console.log('am i here?')
      return {
        ...prevState,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation error'
      }
    }
    const { data } = validatedFields
    const result = await validateAndCreateOrderDetailed({
      clientId: data.clientId,
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

    console.log('Order created successfully:', result.id)

     return {
      ...prevState,
      message: 'Order created successfully',
      success: true,
      errors: {}
    }
  } catch(error) {
    console.error("Error while creating order:", error)
    return {
      ...prevState,
      message: 'Failed to create order',
      success: false,
      errors: {}
    }
  }
}
