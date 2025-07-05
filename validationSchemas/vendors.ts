import { z } from "zod";

export const NewVendorSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required.' }).max(200, { message: 'Name is too long.' }),
  phone: z.string()
    .min(10, { message: 'Phone number must be at least 10 digits.' })
    .max(15, { message: 'Phone number must be at most 15 digits.' })
    .regex(/^\d+$/, { message: 'Phone number must contain only digits.' })
}); 
