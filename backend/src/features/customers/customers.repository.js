// backend/src/features/customers/customers.repository.js
const prisma = require("../../../config/prisma");

class CustomersRepository {
  findMany({ skip, take }) {
    return prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        orders: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });
  }

  count() {
    return prisma.customer.count();
  }

  findById(id) {
    return prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }
}

module.exports = new CustomersRepository();
