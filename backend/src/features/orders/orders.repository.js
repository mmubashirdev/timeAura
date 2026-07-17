// backend/src/features/orders/orders.repository.js
const prisma = require("../../../config/prisma");

class OrdersRepository {
  findMany({ where, skip, take }) {
    return prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  count(where) {
    return prisma.order.count({ where });
  }

  findById(id) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
    });
  }

  createOrderWithItems({ customerId, status, paymentMethod, totalAmount, items }) {
    return prisma.$transaction(async (tx) => {
      // 1. Create the order
      const order = await tx.order.create({
        data: {
          customerId,
          status,
          paymentMethod,
          totalAmount,
        },
      });

      // 2. Create the order items and adjust stock levels
      const itemCreates = [];
      for (const item of items) {
        // Adjust product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: { decrement: item.quantity },
          },
        });

        // Check if stock became 0 to auto mark OUT_OF_STOCK
        const updatedProd = await tx.product.findUnique({
          where: { id: item.productId },
          select: { stockQuantity: true, status: true },
        });

        if (updatedProd && updatedProd.stockQuantity <= 0) {
          await tx.product.update({
            where: { id: item.productId },
            data: { status: "OUT_OF_STOCK", stockQuantity: 0 },
          });
        }

        itemCreates.push(
          tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              variantId: item.variantId || null,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            },
          })
        );
      }

      await Promise.all(itemCreates);

      // 3. Create the initial timeline entry
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          status,
          notes: "Order placed by customer",
        },
      });

      return tx.order.findUnique({
        where: { id: order.id },
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
          statusHistory: true,
        },
      });
    });
  }

  updateStatus(orderId, status, notes) {
    return prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status,
          notes,
        },
      });

      return order;
    });
  }

  // Statistics for dashboard
  async getDashboardStats() {
    const [totalOrders, revenueRes, productsCount, usersCount, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.customer.count(),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { customer: true },
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: revenueRes._sum.totalAmount || 0,
      totalProducts: productsCount,
      activeUsers: usersCount,
      recentOrders: recentOrders.map((o) => ({
        id: `#ORD-${o.id}`,
        customer: o.customer.name,
        date: o.createdAt.toLocaleDateString("en-PK", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: o.status,
        amount: `PKR ${o.totalAmount.toLocaleString()}`,
        rawAmount: o.totalAmount,
      })),
    };
  }
}

module.exports = new OrdersRepository();
