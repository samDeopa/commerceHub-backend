// validations/productValidation.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  variants: z.array(
    z.object({
      name: z.string(),
      sku: z.string(),
      additionalCost: z.number(),
      stockCount: z.number(),
    })
  ),
});
