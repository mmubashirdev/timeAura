const { ValidationError } = require("../errors/AppError");

const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return next(
      new ValidationError(
        "Validation failed",
        result.error.flatten().fieldErrors,
      ),
    );
  }
  req.body = result.data; // use the parsed & typed data downstream, not the raw body
  next();
};

module.exports = validateRequest;
