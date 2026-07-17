// backend/src/features/cart/cart.constants.js
const GUEST_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/v1/cart",
  maxAge: 90 * 24 * 60 * 60 * 1000,
};

module.exports = { GUEST_COOKIE_OPTIONS };
