// backend/src/features/cart/resolveCartOwner.js
const cartService = require("./cart.service");
const { GUEST_COOKIE_OPTIONS } = require("./cart.constants");

// Runs after optionalAuth. Sets req.cartOwner to either { userId } or
// { guestToken }, creating a guest cookie on first visit if needed.
function resolveCartOwner(req, res, next) {
  if (req.user?.sub) {
    req.cartOwner = { userId: req.user.sub };
    return next();
  }

  let guestToken = req.cookies.cartToken;
  if (!guestToken) {
    guestToken = cartService.generateGuestToken();
    res.cookie("cartToken", guestToken, GUEST_COOKIE_OPTIONS);
  }
  req.cartOwner = { guestToken };
  next();
}

module.exports = resolveCartOwner;
