// validations/variantValidation.ts
import { z } from "zod";

export const variantSchema = z.object({
  name: z.string(),
  sku: z.string(),
  additionalCost: z.number(),
  stockCount: z.number(),
});
