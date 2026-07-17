// backend/src/features/products/products.controller.js
const productsService = require("./products.service");
const sendResponse = require("../../shared/utils/sendResponse");

class ProductsController {
  async list(req, res) {
    const result = await productsService.list(req.query);
    sendResponse(res, { message: "OK", data: result });
  }

  async getFilters(req, res) {
    const filters = await productsService.getFilters();
    sendResponse(res, { message: "OK", data: filters });
  }

  async getById(req, res) {
    const product = await productsService.getById(parseInt(req.params.id));
    sendResponse(res, { message: "OK", data: { product } });
  }

  async getBySlug(req, res) {
    const product = await productsService.getBySlug(req.params.slug);
    sendResponse(res, { message: "OK", data: { product } });
  }

  async getRelated(req, res) {
    const products = await productsService.getRelated(req.params.slug);
    sendResponse(res, { message: "OK", data: { products } });
  }

  async create(req, res) {
    const product = await productsService.create(req.body);
    sendResponse(res, {
      message: "Product created successfully",
      statusCode: 201,
      data: { product },
    });
  }

  async update(req, res) {
    const product = await productsService.update(parseInt(req.params.id), req.body);
    sendResponse(res, {
      message: "Product updated successfully",
      data: { product },
    });
  }

  async delete(req, res) {
    await productsService.delete(parseInt(req.params.id));
    sendResponse(res, {
      message: "Product soft deleted successfully",
    });
  }

  async adjustStock(req, res) {
    const { quantityChange } = req.body;
    const product = await productsService.adjustStock(
      parseInt(req.params.id),
      parseInt(quantityChange)
    );
    sendResponse(res, {
      message: "Stock adjusted successfully",
      data: { product },
    });
  }
}

module.exports = new ProductsController();
