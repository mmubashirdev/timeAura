// backend/src/features/categories/categories.controller.js
const categoriesService = require("./categories.service");
const sendResponse = require("../../shared/utils/sendResponse");

class CategoriesController {
  async list(req, res) {
    const result = await categoriesService.list();
    sendResponse(res, { message: "OK", data: result });
  }

  async create(req, res) {
    const result = await categoriesService.create(req.body);
    sendResponse(res, { message: "Category created successfully", data: result });
  }

  async update(req, res) {
    const result = await categoriesService.update(parseInt(req.params.id), req.body);
    sendResponse(res, { message: "Category updated successfully", data: result });
  }

  async delete(req, res) {
    const result = await categoriesService.delete(parseInt(req.params.id));
    sendResponse(res, { message: "Category deleted successfully", data: result });
  }
}

module.exports = new CategoriesController();
