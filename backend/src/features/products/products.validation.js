// backend/src/features/products/products.validation.js

const { z } = require("zod");

// ---------------------------------------------
// Helpers
// ---------------------------------------------

const csv = () =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim().length
        ? value.split(",").map((item) => item.trim())
        : [],
    z.array(z.string()),
  );

// ---------------------------------------------
// List Products
// ---------------------------------------------

const listProductsSchema = z.object({
  category: z.string().optional(),

  min: z.coerce.number().min(0).optional(),

  max: z.coerce.number().min(0).optional(),

  brands: csv(),

  materials: csv(),

  colors: csv(),

  rating: z.coerce.number().min(0).max(5).optional(),

  sort: z
    .enum(["featured", "price-asc", "price-desc", "rating", "newest"])
    .default("featured"),

  page: z.coerce.number().int().min(1).default(1),

  pageSize: z.coerce.number().int().min(1).max(100).default(12),

  search: z.string().optional(),

  status: z.string().optional(),

  includeInactive: z.preprocess((v) => v === "true", z.boolean()).optional(),
});

// ---------------------------------------------
// Base Product Schema
// ---------------------------------------------

const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must be at least 2 characters"),

  slug: z.string().trim().min(2, "Slug must be at least 2 characters"),

  description: z.string().nullable().optional(),

  shortDescription: z.string().nullable().optional(),

  categoryId: z.coerce.number().int().positive("Category is required"),

  brand: z.string().trim().min(1, "Brand is required"),

  sku: z.string().trim().min(2, "SKU is required"),

  price: z.coerce.number().positive("Price must be greater than zero"),

  discountPrice: z.coerce
    .number()
    .positive("Discount price must be positive")
    .nullable()
    .optional(),

  stockQuantity: z.coerce
    .number()
    .int()
    .nonnegative("Stock quantity cannot be negative"),

  status: z.enum(["DRAFT", "PUBLISHED", "OUT_OF_STOCK"]).default("DRAFT"),

  featuredProduct: z.boolean().default(false),

  thumbnailImage: z.string().min(1, "Thumbnail image is required"),

  tags: z.array(z.string()).default([]),

  color: z.string().trim().min(1, "Color is required"),

  material: z.string().trim().min(1, "Material is required"),

  weight: z.coerce.number().positive().nullable().optional(),

  dimensions: z.string().nullable().optional(),

  warranty: z.string().nullable().optional(),

  images: z.array(z.string()).default([]),
});

// ---------------------------------------------
// Create Product
// ---------------------------------------------

const createProductSchema = productSchema.refine(
  (data) => data.discountPrice == null || data.discountPrice < data.price,
  {
    message: "Discount price must be less than the original price",
    path: ["discountPrice"],
  },
);

// ---------------------------------------------
// Update Product
// ---------------------------------------------

const updateProductSchema = productSchema.partial().refine(
  (data) => {
    if (
      data.price !== undefined &&
      data.discountPrice !== undefined &&
      data.discountPrice !== null
    ) {
      return data.discountPrice < data.price;
    }

    return true;
  },
  {
    message: "Discount price must be less than the original price",
    path: ["discountPrice"],
  },
);

// ---------------------------------------------
// Params
// ---------------------------------------------

const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// ---------------------------------------------
// Exports
// ---------------------------------------------

module.exports = {
  listProductsSchema,
  createProductSchema,
  updateProductSchema,
  productIdSchema,
};
