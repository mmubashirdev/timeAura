// backend/src/shared/middlewares/optionalAuth.js
const { verifyAccessToken } = require("../utils/jwt");

// Unlike authGuard, this never rejects — it just attaches req.user if a
// valid token is present, so routes can work for both guests and logged-in users.
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return next();

  const token = authHeader.split(" ")[1];
  try {
    req.user = verifyAccessToken(token);
  } catch {
    // invalid/expired token on an optional route — just proceed as a guest
  }
  next();
}

module.exports = optionalAuth;
