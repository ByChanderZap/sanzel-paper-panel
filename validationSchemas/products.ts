import { z } from "zod";
import { PaperQuality } from "@prisma/client";

const isNumberString = (input: unknown) =>
  z.string().regex(/^\d+(\.\d+)?$/,).safeParse(input).success;

const numberFromNumberOrNumberString = (input: unknown) => {
    if ( typeof input == 'number' ) return input
    if ( isNumberString( input ) ) return Number( input )
}

export const NewProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required." })
    .max(200, { message: "Product name is too long." }),

  quality: z.nativeEnum(PaperQuality, {
    errorMap: () => ({ message: "Invalid paper quality." }),
  }),

  description: z
    .string()
    .max(500, { message: "Description is too long." })
    .optional()
    .or(z.literal("")),

  stock: z
    .preprocess(numberFromNumberOrNumberString, z.number().min(1, { message: "Must be a number" }).max(100000, { message: "Stock is too large" })),

  unit_price: z
    .preprocess(numberFromNumberOrNumberString, z.number().min(1, { message: "Must be a number" }).max(1000000, { message: "Unit price is too high" })),

  width: z
    .preprocess(numberFromNumberOrNumberString, z.number().min(1, { message: "Must be a number" }).max(10000, { message: "Width is too large" })),

  linear_size: z
    .preprocess(numberFromNumberOrNumberString, z.number().min(1, { message: "Must be a number" }).max(100000, { message: "Linear size is too large" })),
});
