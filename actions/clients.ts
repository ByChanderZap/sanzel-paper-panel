'use server'

import { ClientsFormState } from "@/types/clients"
import { NewClientSchema } from "@/validationSchemas/clients"
import { createClient } from "@/lib/clients/clients"
import { redirect } from "next/navigation"

export async function newClient(prevState: ClientsFormState, formData: FormData): Promise<ClientsFormState> {
  const validatedFields = await NewClientSchema.safeParseAsync({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    shippingNumber: formData.get('shippingNumber'),
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state')
  })

  if(!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      errorMessage: 'Validation error'
    }
  }

  const { data } = validatedFields
  try {
    await createClient(data)
  } catch(error) {
    console.error(error)
    return {
      errorMessage: error as unknown as string
    }
  }

  redirect('/clients')
}

