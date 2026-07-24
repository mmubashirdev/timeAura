const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const app = require("./app");
const env = require("../config/env");
const prisma = require("../config/prisma"); // default export, no destructuring
const logger = require("./shared/utils/logger"); // confirm this path matches your actual file

const PORT = env.PORT;

console.log(
  "DATABASE_URL host:",
  env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "NOT SET",
);

const server = app.listen(PORT, () =>
  logger.info(`Time Aura backend running on port ${PORT}`),
);

async function shutdown(signal) {
  logger.info(`${signal} received: closing server gracefully`);
  server.close(() => logger.info("HTTP server closed"));
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
