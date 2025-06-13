"use server"

import { OrderFormState } from "@/types/orders"
import { CreateOrderSchema } from "@/validationSchemas/orders"

export const createOrderAction = async (prevState: OrderFormState, formData: FormData): Promise<OrderFormState> => {

  try {
    const orderItemsRaw = formData.get('orderItems') as string
    const orderItems = JSON.parse(orderItemsRaw)

    const parsedOrderItems = orderItems.map((item: any) => ({
      ...item,
      quantity: parseInt(item.quantity),
      width: parseFloat(item.width),
      linear_size: parseFloat(item.linear_size),
      unit_price: parseFloat(item.unit_price)
    }))

    const validatedFields = await CreateOrderSchema.safeParseAsync({
      clientId: formData.get('clientId'),
      status: formData.get('status')?.toString().toUpperCase() as any,
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
  } catch(error) {
    console.error("Error while creating order", error)
  }


  console.log(formData)
  return {
    message: "TODO BIEN",
    // success: true,
    errors: {
      client: ["no papa"],
      orderItems: ["fallo wey order items"],
      orderTotal: ["wey fallo el total order"],
      status: ["que pedo con el status cabron"]
    }
  }
}
