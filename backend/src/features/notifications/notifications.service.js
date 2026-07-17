// backend/src/features/notifications/notifications.service.js
const notificationsRepository = require("./notifications.repository");
const { NotFoundError } = require("../../shared/errors/AppError");

class NotificationsService {
  async list(filters) {
    const where = {};
    if (filters.customerId) {
      where.customerId = parseInt(filters.customerId);
    } else if (filters.adminOnly === "true") {
      // Admin global notifications (low stock, customer orders, etc.)
      where.customerId = null;
    }
    
    if (filters.isRead !== undefined) {
      where.isRead = filters.isRead === "true";
    }

    const page = parseInt(filters.page) || 1;
    const pageSize = parseInt(filters.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      notificationsRepository.findMany({ where, skip, take: pageSize }),
      notificationsRepository.count(where),
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

  async markAsRead(id) {
    const notification = await notificationsRepository.findById(id);
    if (!notification) throw new NotFoundError("Notification not found");

    return notificationsRepository.update(id, { isRead: true });
  }

  async markAllAsRead(customerId) {
    const where = {};
    if (customerId) {
      where.customerId = parseInt(customerId);
    } else {
      where.customerId = null;
    }
    return notificationsRepository.markAllAsRead(where);
  }
}

module.exports = new NotificationsService();
