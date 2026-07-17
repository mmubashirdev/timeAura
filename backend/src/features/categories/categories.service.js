// backend/src/features/categories/categories.service.js
const categoriesRepository = require("./categories.repository");
const { ConflictError, NotFoundError } = require("../../shared/errors/AppError");

class CategoriesService {
  async list() {
    return categoriesRepository.findMany();
  }

  async getById(id) {
    const category = await categoriesRepository.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  async create(data) {
    const existingName = await categoriesRepository.findByName(data.name);
    if (existingName) throw new ConflictError("Category name already exists");

    const existingSlug = await categoriesRepository.findBySlug(data.slug);
    if (existingSlug) throw new ConflictError("Category slug already exists");

    return categoriesRepository.create(data);
  }

  async update(id, data) {
    const category = await categoriesRepository.findById(id);
    if (!category) throw new NotFoundError("Category not found");

    if (data.name) {
      const existingName = await categoriesRepository.findByName(data.name);
      if (existingName && existingName.id !== id) {
        throw new ConflictError("Category name already exists");
      }
    }

    if (data.slug) {
      const existingSlug = await categoriesRepository.findBySlug(data.slug);
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictError("Category slug already exists");
      }
    }

    return categoriesRepository.update(id, data);
  }

  async delete(id) {
    const category = await categoriesRepository.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    return categoriesRepository.delete(id);
  }
}

module.exports = new CategoriesService();
