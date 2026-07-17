// backend/src/features/orders/orders.service.js
const ordersRepository = require("./orders.repository");
const productsRepository = require("../products/products.repository");
const prisma = require("../../../config/prisma");
const { ValidationError, NotFoundError } = require("../../shared/errors/AppError");

class OrdersService {
  async list(filters) {
    const where = {};
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.customerId) {
      where.customerId = parseInt(filters.customerId);
    }

    const page = parseInt(filters.page) || 1;
    const pageSize = parseInt(filters.pageSize) || 12;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      ordersRepository.findMany({ where, skip, take: pageSize }),
      ordersRepository.count(where),
    ]);

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    };
  }

  async getById(id) {
    const order = await ordersRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found");
    return order;
  }

  async create(data) {
    const { name, phone, email, address, city, paymentMethod, items } = data;

    // 1. Resolve customer by unique phone number (Pakistani market standard)
    let customer = await prisma.customer.findUnique({ where: { phone } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: { name, phone, email, address, city },
      });
    } else {
      // Update customer address and email if they changed
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: { name, email, address, city },
      });
    }

    // 2. Validate products and calculate pricing
    const orderItemsToCreate = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await productsRepository.findById(item.productId);
      if (!product || !product.isActive) {
        throw new ValidationError(`Product with ID ${item.productId} is not available`);
      }

      if (product.status === "DRAFT") {
        throw new ValidationError(`Product '${product.name}' is currently in draft and cannot be ordered`);
      }

      // Check stock
      if (product.stockQuantity < item.quantity) {
        throw new ValidationError(
          `Insufficient stock for '${product.name}'. Available: ${product.stockQuantity}, Requested: ${item.quantity}`
        );
      }

      // Pricing: use discountPrice if present, otherwise price
      const price = product.discountPrice || product.price;
      const unitTotal = price * item.quantity;
      totalAmount += unitTotal;

      orderItemsToCreate.push({
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
        unitPrice: price,
      });
    }

    // 3. Create order inside a database transaction
    const order = await ordersRepository.createOrderWithItems({
      customerId: customer.id,
      status: "Order Placed",
      paymentMethod,
      totalAmount,
      items: orderItemsToCreate,
    });

    // 4. Create customer notification
    await this.notifyCustomer(
      customer.id,
      "Order Placed",
      `Your order #${order.id} for PKR ${totalAmount.toLocaleString()} has been placed successfully!`
    );

    // 5. Admin low-stock warning checks
    for (const item of items) {
      const product = await productsRepository.findById(item.productId);
      if (product && product.stockQuantity <= 5) {
        // Create an admin warning notification (customerId is null/optional for global warnings)
        await prisma.notification.create({
          data: {
            title: "Low Stock Warning",
            message: `Product '${product.name}' (SKU: ${product.sku}) is low on stock! Remaining: ${product.stockQuantity} units.`,
          },
        });
      }
    }

    return order;
  }

  async updateStatus(id, status, notes) {
    const order = await ordersRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found");

    const updatedOrder = await ordersRepository.updateStatus(id, status, notes);

    // Trigger Notification to Customer
    await this.notifyCustomer(
      order.customerId,
      `Order Status Update: ${status}`,
      `The status of your order #${order.id} has been changed to '${status}'.${notes ? ` Notes: ${notes}` : ""}`
    );

    return updatedOrder;
  }

  async getDashboardStats() {
    return ordersRepository.getDashboardStats();
  }

  // Helper method that decouples notifications mechanism (SOLID)
  async notifyCustomer(customerId, title, message) {
    // 1. Write to DB Notification
    await prisma.notification.create({
      data: {
        customerId,
        title,
        message,
      },
    });

    // 2. Extensible Email trigger placeholder
    try {
      await this.sendEmailNotification(customerId, title, message);
    } catch (e) {
      console.error("Email notification failed:", e);
    }
  }

  async sendEmailNotification(customerId, title, message) {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer || !customer.email) return;

    // Send email using system mailer utility (stubbed logic, ready for production mailer integration)
    console.log(`[EMAIL NOTIFICATION SENT] To: ${customer.email} | Subject: ${title} | Body: ${message}`);
  }
}

module.exports = new OrdersService();
