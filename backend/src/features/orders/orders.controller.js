// backend/src/features/orders/orders.controller.js
const ordersService = require("./orders.service");
const sendResponse = require("../../shared/utils/sendResponse");

class OrdersController {
  async list(req, res) {
    const result = await ordersService.list(req.query);
    sendResponse(res, { message: "OK", data: result });
  }

  async getById(req, res) {
    const order = await ordersService.getById(parseInt(req.params.id));
    sendResponse(res, { message: "OK", data: { order } });
  }

  async create(req, res) {
    const order = await ordersService.create(req.body);
    sendResponse(res, {
      message: "Order placed successfully",
      statusCode: 201,
      data: { order },
    });
  }

  async updateStatus(req, res) {
    const { status, notes } = req.body;
    const order = await ordersService.updateStatus(
      parseInt(req.params.id),
      status,
      notes
    );
    sendResponse(res, {
      message: "Order status updated successfully",
      data: { order },
    });
  }

  async dashboardStats(req, res) {
    const stats = await ordersService.getDashboardStats();
    sendResponse(res, { message: "OK", data: stats });
  }
}

module.exports = new OrdersController();
