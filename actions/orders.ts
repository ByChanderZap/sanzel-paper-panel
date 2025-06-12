"use server"

export type FormState = {
  success: boolean
  message: string
  errors: Record<string, string>
}

export const createOrderAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  console.log('a')
  console.log(formData)
  return prevState
}
