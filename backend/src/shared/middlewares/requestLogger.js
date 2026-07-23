const pinoHttp = require("pino-http");
const logger = require("../utils/logger");

const requestLogger = pinoHttp({
  logger,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.body.password",
      "req.body.otp",
    ],
    censor: "[REDACTED]",
  },
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});

module.exports = requestLogger;
