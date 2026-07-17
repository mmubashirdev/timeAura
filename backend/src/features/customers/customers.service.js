// backend/src/features/customers/customers.service.js
const customersRepository = require("./customers.repository");
const { NotFoundError } = require("../../shared/errors/AppError");

class CustomersService {
  async getCustomers({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const [customers, total] = await Promise.all([
      customersRepository.findMany({ skip, take: limit }),
      customersRepository.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      customers,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async getCustomerById(id) {
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new NotFoundError(`Customer with ID ${id} not found`);
    }
    return customer;
  }
}

module.exports = new CustomersService();
