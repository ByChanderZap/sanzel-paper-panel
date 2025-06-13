"use server"

import { OrderFormState } from "@/types/orders"

export const createOrderAction = async (prevState: OrderFormState, formData: FormData): Promise<OrderFormState> => {
  console.log('a')
  console.log(formData)
  return prevState
}
