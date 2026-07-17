// backend/src/features/customers/customers.controller.js
const customersService = require("./customers.service");

class CustomersController {
  async getCustomers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await customersService.getCustomers({ page, limit });
      
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await customersService.getCustomerById(id);
      
      res.json({
        status: "success",
        data: { customer },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomersController();
