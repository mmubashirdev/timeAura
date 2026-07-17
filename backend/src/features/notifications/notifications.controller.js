// backend/src/features/notifications/notifications.controller.js
const notificationsService = require("./notifications.service");
const sendResponse = require("../../shared/utils/sendResponse");

class NotificationsController {
  async list(req, res) {
    const result = await notificationsService.list(req.query);
    sendResponse(res, { message: "OK", data: result });
  }

  async markAsRead(req, res) {
    const result = await notificationsService.markAsRead(parseInt(req.params.id));
    sendResponse(res, { message: "Notification marked as read", data: result });
  }

  async markAllAsRead(req, res) {
    // If query has customerId, mark customer alerts; otherwise mark admin global alerts
    const customerId = req.query.customerId ? parseInt(req.query.customerId) : null;
    await notificationsService.markAllAsRead(customerId);
    sendResponse(res, { message: "All notifications marked as read" });
  }
}

module.exports = new NotificationsController();
