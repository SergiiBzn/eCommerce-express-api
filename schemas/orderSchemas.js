import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.number().int().positive(),
  products: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

export const updateOrderSchema = createOrderSchema.partial();
