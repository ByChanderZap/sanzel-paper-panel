'use server'

import { ClientsFormState, UpdateClientFormState } from "@/types/clients"
import { NewClientSchema } from "@/validationSchemas/clients"
import { createClient, updateClient } from "@/lib/clients/clients"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function newClient(prevState: ClientsFormState, formData: FormData): Promise<ClientsFormState> {
  const emailRaw = formData.get('email');
  const email = emailRaw === '' ? undefined : emailRaw;

  const validatedFields = await NewClientSchema.safeParseAsync({
    name: formData.get('name'),
    email: email,
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

  revalidatePath('/clients')
  redirect('/clients')
}

 
export async function updateClientAction(prevState: UpdateClientFormState, formData: FormData): Promise<UpdateClientFormState> {

  const clientId = formData.get('clientId') as string
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
      errorMessage: 'Validation error',
      values: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        shippingNumber: formData.get('shippingNumber') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
      }
    }
  }

  try {
    await updateClient(clientId, validatedFields.data)
  } catch(error) {
    console.error(error)
    return {
      errorMessage: error as unknown as string
    }
  }

  revalidatePath(`/clients/${clientId}/summary`)
  redirect(`/clients/${clientId}/summary`)
}
