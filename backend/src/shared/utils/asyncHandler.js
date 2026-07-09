// Wraps every controller so a rejected promise or thrown error
// is forwarded to Express's error pipeline instead of crashing the process.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
