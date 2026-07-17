// backend/src/features/cart/cart.routes.js
const express = require("express");
const cartController = require("./cart.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const validateRequest = require("../../shared/middlewares/validateRequest");
const optionalAuth = require("../../shared/middlewares/optionalAuth");
const authGuard = require("../../shared/middlewares/authGuard");
const resolveCartOwner = require("./resolveCartOwner");
const {
  addItemSchema,
  updateItemSchema,
  couponSchema,
  mergeSchema,
} = require("./cart.validation");

const router = express.Router();

// All routes below work for guests and logged-in users
router.use(optionalAuth, resolveCartOwner);

router.get("/", asyncHandler(cartController.getCart));
router.post(
  "/items",
  validateRequest(addItemSchema),
  asyncHandler(cartController.addItem),
);
router.patch(
  "/items/:productId",
  validateRequest(updateItemSchema),
  asyncHandler(cartController.updateItem),
);
router.delete("/items/:productId", asyncHandler(cartController.removeItem));
router.delete("/", asyncHandler(cartController.clearCart));
router.post(
  "/coupon",
  validateRequest(couponSchema),
  asyncHandler(cartController.applyCoupon),
);
router.delete("/coupon", asyncHandler(cartController.removeCoupon));

// Merge only makes sense for a real, authenticated user — separate strict guard
router.post(
  "/merge",
  authGuard(),
  validateRequest(mergeSchema),
  asyncHandler(cartController.mergeCart),
);

module.exports = router;
