'use server'

import { ClientsFormState } from "@/types/clients"

export async function newClient(prevState: ClientsFormState, formData: FormData): Promise<ClientsFormState> {
  console.log(formData)

  return prevState
}

