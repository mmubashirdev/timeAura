const express = require("express");
const authController = require("./auth.controller");
const validateRequest = require("../../shared/middlewares/validateRequest");
const asyncHandler = require("../../shared/utils/asyncHandler");
const authGuard = require("../../shared/middlewares/authGuard");
const { authLimiter } = require("../../shared/middlewares/rateLimiter");
const { registerSchema, loginSchema } = require("./auth.validation");

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validateRequest(registerSchema),
  asyncHandler(authController.register),
);
router.post(
  "/login",
  authLimiter,
  validateRequest(loginSchema),
  asyncHandler(authController.login),
);
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", authGuard(), asyncHandler(authController.logout));

module.exports = router;
