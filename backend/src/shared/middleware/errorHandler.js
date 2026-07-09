const env = require("../../config/env");
const { AppError } = require("../errors/AppError");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isKnown = err instanceof AppError;
  const statusCode = isKnown ? err.statusCode : 500;

  req.log?.error({ err, path: req.path, method: req.method }, "Request failed");

  res.status(statusCode).json({
    success: false,
    message: isKnown ? err.message : "Internal server error",
    ...(isKnown && err.details ? { details: err.details } : {}),
    ...(env.NODE_ENV === "development" && !isKnown ? { stack: err.stack } : {}),
  });
}

module.exports = errorHandler;
