// backend/src/features/products/products.repository.js
const prisma = require("../../../config/prisma");

class ProductsRepository {
  findMany({ where, orderBy, skip, take }) {
    return prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });
  }

  count(where) {
    return prisma.product.count({ where });
  }

  findById(id) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });
  }

  findBySlug(slug) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });
  }

  findBySku(sku) {
    return prisma.product.findUnique({
      where: { sku },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });
  }

  create(data) {
    const { images, ...productData } = data;
    return prisma.product.create({
      data: {
        ...productData,
        images: images && images.length
          ? {
              create: images.map((url, index) => ({
                url,
                position: index,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });
  }

  update(id, data) {
    const { images, ...productData } = data;
    
    // Prepare update parameters
    const updateData = { ...productData };
    
    if (images) {
      updateData.images = {
        deleteMany: {},
        create: images.map((url, index) => ({
          url,
          position: index,
        })),
      };
    }

    return prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
      },
    });
  }

  // Soft delete preferred instead of permanent deletion
  delete(id) {
    return prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  findCategories() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  }

  async facetCounts() {
    const [byCategory, byBrand, byMaterial, total] = await Promise.all([
      prisma.product.groupBy({
        by: ["categoryId"],
        where: { isActive: true },
        _count: true,
      }),
      prisma.product.groupBy({
        by: ["brand"],
        where: { isActive: true },
        _count: true,
      }),
      prisma.product.groupBy({
        by: ["material"],
        where: { isActive: true },
        _count: true,
      }),
      prisma.product.count({ where: { isActive: true } }),
    ]);
    return { byCategory, byBrand, byMaterial, total };
  }
}

module.exports = new ProductsRepository();
