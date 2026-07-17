// backend/src/features/categories/categories.repository.js
const prisma = require("../../../config/prisma");

class CategoriesRepository {
  findMany() {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
  }

  findById(id) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  findBySlug(slug) {
    return prisma.category.findUnique({
      where: { slug },
    });
  }

  findByName(name) {
    return prisma.category.findUnique({
      where: { name },
    });
  }

  create(data) {
    return prisma.category.create({
      data,
    });
  }

  update(id, data) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  delete(id) {
    return prisma.category.delete({
      where: { id },
    });
  }
}

module.exports = new CategoriesRepository();
