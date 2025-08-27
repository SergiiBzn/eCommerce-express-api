import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  categoryId: z.number().int().positive(),
});

export const updateProductSchema = createProductSchema.partial();
