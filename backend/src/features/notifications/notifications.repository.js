// backend/src/features/notifications/notifications.repository.js
const prisma = require("../../../config/prisma");

class NotificationsRepository {
  findMany({ where, skip, take }) {
    return prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        customer: true,
      },
    });
  }

  count(where) {
    return prisma.notification.count({ where });
  }

  findById(id) {
    return prisma.notification.findUnique({
      where: { id },
    });
  }

  update(id, data) {
    return prisma.notification.update({
      where: { id },
      data,
    });
  }

  markAllAsRead(where) {
    return prisma.notification.updateMany({
      where,
      data: { isRead: true },
    });
  }
}

module.exports = new NotificationsRepository();
