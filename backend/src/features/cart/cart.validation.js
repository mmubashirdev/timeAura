// backend/src/features/cart/cart.validation.js
const { z } = require("zod");

const addItemSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().min(1).max(99).default(1),
});

const updateItemSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(99),
});

const couponSchema = z.object({
  code: z.string().min(1).max(30),
});

const mergeSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().min(1).max(99),
      }),
    )
    .max(100)
    .default([]),
});

module.exports = { addItemSchema, updateItemSchema, couponSchema, mergeSchema };
