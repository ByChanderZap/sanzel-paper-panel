'use server'

import { NewVendorSchema } from "@/validationSchemas/vendors";
import { createVendor, getAllVendors } from "@/lib/vendors/vendors";
import { VendorsFormState } from "@/types/vendors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation.js";

export async function newVendor(prevState: VendorsFormState, formData: FormData): Promise<VendorsFormState> {
  const validatedFields = await NewVendorSchema.safeParseAsync({
    name: formData.get('name'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      errorMessage: 'Validation error',
    };
  }

  try {
    await createVendor(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      errorMessage: error as unknown as string,
    };
  }

  revalidatePath('/vendors');
  revalidatePath('/orders/new');
  redirect('/vendors');
}

export async function fetchVendors() {
  return await getAllVendors();
} 
