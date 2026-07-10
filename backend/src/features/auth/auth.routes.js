const express = require("express");
const authController = require("./auth.controller");
const validateRequest = require("../../shared/middlewares/validateRequest");
const asyncHandler = require("../../shared/utils/asyncHandler");
const authGuard = require("../../shared/middlewares/authGuard");
const {
  authLimiter,
  otpRequestLimiter,
} = require("../../shared/middlewares/rateLimiter");
const {
  registerSchema,
  loginSchema,
  emailOnlySchema,
  verifyEmailSchema,
  resetPasswordSchema,
} = require("./auth.validation");

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validateRequest(registerSchema),
  asyncHandler(authController.register),
);
router.post(
  "/verify-email",
  authLimiter,
  validateRequest(verifyEmailSchema),
  asyncHandler(authController.verifyEmail),
);
router.post(
  "/resend-verification",
  otpRequestLimiter,
  validateRequest(emailOnlySchema),
  asyncHandler(authController.resendVerification),
);

router.post(
  "/login",
  authLimiter,
  validateRequest(loginSchema),
  asyncHandler(authController.login),
);

router.get("/me", authGuard(), asyncHandler(authController.me));

router.post(
  "/forgot-password",
  otpRequestLimiter,
  validateRequest(emailOnlySchema),
  asyncHandler(authController.forgotPassword),
);
router.post(
  "/reset-password",
  authLimiter,
  validateRequest(resetPasswordSchema),
  asyncHandler(authController.resetPassword),
);

router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", authGuard(), asyncHandler(authController.logout));

module.exports = router;
