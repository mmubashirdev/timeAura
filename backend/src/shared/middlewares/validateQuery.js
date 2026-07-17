// backend/src/shared/middlewares/validateQuery.js
const { ValidationError } = require("../errors/AppError");

const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return next(
      new ValidationError(
        "Validation failed",
        result.error.flatten().fieldErrors,
      ),
    );
  }
  req.query = result.data;
  next();
};

module.exports = validateQuery;
