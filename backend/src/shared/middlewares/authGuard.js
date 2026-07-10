const { verifyAccessToken } = require("../utils/jwt");
const { UnauthorizedError, ForbiddenError } = require("../errors/AppError");

function authGuard(...allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Missing access token"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = verifyAccessToken(token);
      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return next(new ForbiddenError("Insufficient permissions"));
      }
      req.user = payload;
      next();
    } catch (err) {
      next(new UnauthorizedError("Invalid or expired access token"));
    }
  };
}

module.exports = authGuard;
