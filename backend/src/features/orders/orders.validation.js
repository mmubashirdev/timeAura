// backend/src/features/orders/orders.validation.js
const { z } = require("zod");

const createOrderSchema = z.object({
  name: z.string().min(2, "Customer name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().nullable(),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  paymentMethod: z.enum(["COD", "JAZZCASH", "EASYPAISA", "CARD"]),
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int().positive("Invalid product ID"),
        variantId: z.coerce.number().int().positive().optional().nullable(),
        quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "Order must contain at least one item"),
});

const updateOrderStatusSchema = z.object({
  status: z.string().min(1, "Status is required"),
  notes: z.string().optional().nullable(),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};
