'use server'

import { ProductsFormState } from "@/types/products"
import { NewProductSchema } from "@/validationSchemas/products"
import { createProduct } from "@/lib/products/products"
import { redirect } from "next/navigation"

export async function newProduct(prevState: ProductsFormState, formData: FormData): Promise<ProductsFormState> {
  const validatedFields = await NewProductSchema.safeParseAsync({
    name: formData.get('name'),
    quality: formData.get('quality'),
    description: formData.get('description'),
    stock: formData.get('stock'),
    unit_price: formData.get('unit_price'),
    width: formData.get('width'),
    linear_size: formData.get('linear_size')
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
    await createProduct(data)
  } catch(error) {
    console.error(error)
    return {
      errorMessage: 'Error while trying to create product.'
    }
  }
  redirect('/products')
}
