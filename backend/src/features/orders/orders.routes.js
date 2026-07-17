// backend/src/features/orders/orders.routes.js
const express = require("express");
const ordersController = require("./orders.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const authGuard = require("../../shared/middlewares/authGuard");
const validateRequest = require("../../shared/middlewares/validateRequest");
const { createOrderSchema, updateOrderStatusSchema } = require("./orders.validation");

const router = express.Router();

// Stats route for admin dashboard
router.get("/stats", authGuard("ADMIN"), asyncHandler(ordersController.dashboardStats));

// List orders for admin
router.get("/", authGuard("ADMIN"), asyncHandler(ordersController.list));

// Place order (Public for Checkout)
router.post(
  "/",
  validateRequest(createOrderSchema),
  asyncHandler(ordersController.create)
);

// Get order details
router.get("/:id", asyncHandler(ordersController.getById));

// Update order status (Admin)
router.put(
  "/:id/status",
  authGuard("ADMIN"),
  validateRequest(updateOrderStatusSchema),
  asyncHandler(ordersController.updateStatus)
);

module.exports = router;
