// backend/src/features/products/products.service.js
const productsRepository = require("./products.repository");
const { NotFoundError, ConflictError, ValidationError } = require("../../shared/errors/AppError");

const COLOR_PALETTE = [
  { name: "Black", hex: "#000000" },
  { name: "Brown", hex: "#5c3a1e" },
  { name: "Maroon", hex: "#800020" },
  { name: "Navy", hex: "#1a2a4a" },
  { name: "Green", hex: "#1f4d3a" },
  { name: "Silver", hex: "#c8c8c8" },
];
const MATERIALS_LIST = ["Leather", "Stainless Steel", "Gold Plated", "Glass"];

function toProductDTO(product) {
  if (!product) return null;
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription,
    categoryId: product.categoryId,
    category: product.category.slug,
    categoryLabel: product.category.name,
    brand: product.brand,
    sku: product.sku,
    price: product.price,
    discountPrice: product.discountPrice,
    stockQuantity: product.stockQuantity,
    status: product.status,
    featuredProduct: product.featuredProduct,
    thumbnailImage: product.thumbnailImage,
    tags: product.tags,
    color: product.color,
    colorHex: product.colorHex,
    material: product.material,
    weight: product.weight,
    dimensions: product.dimensions,
    warranty: product.warranty,
    images: product.images ? product.images.map((img) => img.url) : [],
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

const SORT_MAP = {
  "price-asc": [{ price: "asc" }],
  "price-desc": [{ price: "desc" }],
  rating: [{ rating: "desc" }],
  newest: [{ createdAt: "desc" }],
  featured: [{ featuredProduct: "desc" }, { createdAt: "desc" }],
};

class ProductsService {
  async list(filters) {
    const where = {};

    // For customers, show only active, non-draft products
    if (!filters.includeInactive) {
      where.isActive = true;
      where.status = { in: ["PUBLISHED", "OUT_OF_STOCK"] };
    }

    if (filters.category && filters.category !== "all") {
      where.category = { slug: filters.category };
    }

    if (filters.min != null || filters.max != null) {
      where.price = {};
      if (filters.min != null && !isNaN(parseInt(filters.min, 10))) {
        where.price.gte = parseInt(filters.min, 10);
      }
      if (filters.max != null && !isNaN(parseInt(filters.max, 10))) {
        where.price.lte = parseInt(filters.max, 10);
      }
      if (Object.keys(where.price).length === 0) {
        delete where.price;
      }
    }

    if (filters.brands && filters.brands.length) where.brand = { in: filters.brands };
    if (filters.materials && filters.materials.length) where.material = { in: filters.materials };
    if (filters.colors && filters.colors.length) where.color = { in: filters.colors };

    // Search filter: searches SKU, name, or description
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { sku: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    // Stock Status filter (for Admin panel)
    if (filters.status) {
      where.status = filters.status;
    }

    const page = parseInt(filters.page, 10) || 1;
    const pageSize = parseInt(filters.pageSize, 10) || 12;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      productsRepository.findMany({
        where,
        orderBy: SORT_MAP[filters.sort] || SORT_MAP.featured,
        skip,
        take: pageSize,
      }),
      productsRepository.count(where),
    ]);

    return {
      items: items.map(toProductDTO),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    };
  }

  async getById(id) {
    const product = await productsRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");
    return toProductDTO(product);
  }

  async getBySlug(slug) {
    const product = await productsRepository.findBySlug(slug);
    if (!product) throw new NotFoundError("Product not found");
    // Customers cannot view inactive products
    if (!product.isActive) throw new NotFoundError("Product not found");
    return toProductDTO(product);
  }

  async getRelated(slug, limit = 6) {
    const product = await productsRepository.findBySlug(slug);
    if (!product) throw new NotFoundError("Product not found");
    const { items } = await this.list({
      category: product.category.slug,
      brands: [],
      materials: [],
      colors: [],
      sort: "featured",
      page: 1,
      pageSize: limit + 1,
    });
    return items.filter((p) => p.slug !== slug).slice(0, limit);
  }

  async create(data) {
    // Unique SKU check
    const existingSku = await productsRepository.findBySku(data.sku);
    if (existingSku) throw new ConflictError(`Product with SKU '${data.sku}' already exists`);

    // Unique Slug check
    const existingSlug = await productsRepository.findBySlug(data.slug);
    if (existingSlug) throw new ConflictError(`Product with slug '${data.slug}' already exists`);

    // Set OUT_OF_STOCK automatically when quantity reaches zero
    if (data.stockQuantity === 0) {
      data.status = "OUT_OF_STOCK";
    }

    // Design system mapping for colorHex
    const foundColor = COLOR_PALETTE.find((c) => c.name.toLowerCase() === data.color.toLowerCase());
    data.colorHex = foundColor ? foundColor.hex : "#CCCCCC";

    const product = await productsRepository.create(data);
    return toProductDTO(product);
  }

  async update(id, data) {
    const product = await productsRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");

    if (data.sku) {
      const existingSku = await productsRepository.findBySku(data.sku);
      if (existingSku && existingSku.id !== id) {
        throw new ConflictError(`Product with SKU '${data.sku}' already exists`);
      }
    }

    if (data.slug) {
      const existingSlug = await productsRepository.findBySlug(data.slug);
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictError(`Product with slug '${data.slug}' already exists`);
      }
    }

    // Set OUT_OF_STOCK automatically when quantity reaches zero
    if (data.stockQuantity !== undefined) {
      if (data.stockQuantity === 0) {
        data.status = "OUT_OF_STOCK";
      } else if (product.status === "OUT_OF_STOCK" && data.stockQuantity > 0) {
        // If stock goes positive, mark as PUBLISHED
        data.status = "PUBLISHED";
      }
    }

    if (data.color) {
      const foundColor = COLOR_PALETTE.find((c) => c.name.toLowerCase() === data.color.toLowerCase());
      data.colorHex = foundColor ? foundColor.hex : "#CCCCCC";
    }

    const updated = await productsRepository.update(id, data);
    return toProductDTO(updated);
  }

  async delete(id) {
    const product = await productsRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");
    const deleted = await productsRepository.delete(id);
    return toProductDTO(deleted);
  }

  async adjustStock(id, quantityChange) {
    const product = await productsRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");

    const newStock = product.stockQuantity + quantityChange;
    if (newStock < 0) {
      throw new ValidationError("Stock quantity cannot be negative");
    }

    let newStatus = product.status;
    if (newStock === 0) {
      newStatus = "OUT_OF_STOCK";
    } else if (product.status === "OUT_OF_STOCK" && newStock > 0) {
      newStatus = "PUBLISHED";
    }

    const updated = await productsRepository.update(id, {
      stockQuantity: newStock,
      status: newStatus,
    });

    return toProductDTO(updated);
  }

  async getFilters() {
    const [categories, counts] = await Promise.all([
      productsRepository.findCategories(),
      productsRepository.facetCounts(),
    ]);

    const categoryCountMap = Object.fromEntries(
      counts.byCategory.map((c) => [c.categoryId, c._count]),
    );

    return {
      categories: [
        { key: "all", label: "All Products", count: counts.total },
        ...categories.map((c) => ({
          key: c.slug,
          label: c.name,
          count: categoryCountMap[c.id] || 0,
        })),
      ],
      brands: counts.byBrand.map((b) => ({ name: b.brand, count: b._count })),
      materials: MATERIALS_LIST.map((name) => {
        const found = counts.byMaterial.find((m) => m.material === name);
        return { name, count: found ? found._count : 0 };
      }),
      colors: COLOR_PALETTE,
    };
  }
}

module.exports = new ProductsService();
