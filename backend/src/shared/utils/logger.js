const pino = require("pino");
const env = require("../../../config/env");

const isProd = env.NODE_ENV === "production";

let transport;
if (!isProd) {
  try {
    require.resolve("pino-pretty");
    transport = {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    };
  } catch {
    // pino-pretty not installed in this environment — fall back to plain JSON
    transport = undefined;
  }
}

const logger = pino({
  level: isProd ? "info" : "debug",
  transport,
});

module.exports = logger;
