// backend/src/features/notifications/notifications.routes.js
const express = require("express");
const notificationsController = require("./notifications.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const authGuard = require("../../shared/middlewares/authGuard");

const router = express.Router();

router.get("/", asyncHandler(notificationsController.list));
router.put("/read-all", asyncHandler(notificationsController.markAllAsRead));
router.put("/:id/read", asyncHandler(notificationsController.markAsRead));

module.exports = router;
