import { z } from "zod";

export const NewClientSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Please enter a valid name.',
      }).trim().min(1, {
        message: 'Name is required.'
      }).max(200, {
        message: 'Name is too long.'
      }),

    email: z
      .string()
      .email('Not a valid Email.')
      .min(1, { message: 'Email is required.' })
      .max(300, { message: 'Email is too long.' })
      .nullable()
      .optional(),
    
    phone: z
      .string()
      .transform(val => val === '' ? undefined : val)
      .optional()
      .refine(val => !val || /^\d+$/.test(val), { message: 'Phone number must contain only digits.' })
      .refine(val => !val || val.length >= 10, { message: 'Phone number must be at least 10 digits.' })
      .refine(val => !val || val.length <= 11, { message: 'Phone number must be at most 11 digits.' }),
    
    shippingNumber: z
      .string()
      .max(100)
      .optional(),
    
    address: z
      .string()
      .max(300, { message: 'Address exceeded character limit' })
      .transform(val => val === '' ? undefined : val)
      .optional(),

    city: z
      .string()
      .max(300, { message: 'City exceeded character limit' })
      .transform(val => val === '' ? undefined : val)
      .optional(),

    state: z
      .string()
      .max(300, { message: 'State exceeded character limit' })
      .transform(val => val === '' ? undefined : val)
      .optional(),
  })
