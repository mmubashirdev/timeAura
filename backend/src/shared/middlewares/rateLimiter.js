const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many attempts, please try again later.",
  },
});

const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  validate: false,

  message: {
    success: false,
    message: "Too many requests. Please wait before requesting another code.",
  },
});

module.exports = { authLimiter, otpRequestLimiter };
