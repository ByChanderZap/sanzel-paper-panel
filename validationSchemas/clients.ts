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
      .max(300, { message: 'Email is too long.' }),
    
    phone: z
      .string()
      .min(1, { message: 'Phone number is required.' })
      .min(10, { message: 'Phone number must be at least 10 digits.' })
      .max(11, { message: 'Phone number must be at most 11 digits.' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits.' }),
    
    shippingNumber: z
      .string()
      .max(100)
      .optional(),
    
    address: z
      .string()
      .min(3, { message: 'Address is required' })
      .max(300, { message: 'Address exceeded character limit' }),

    city: z
      .string()
      .min(3, { message: 'City is required' })
      .max(300, { message: 'City exceeded character limit' }),

    state: z
      .string()
      .min(3, { message: 'State is required' })
      .max(300, { message: 'State exceeded character limit' })
  })
