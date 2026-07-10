const { PrismaClient } = require("../src/generated/prisma");
const env = require("./env");

const prisma = new PrismaClient({
  log:
    env.NODE_ENV === "development"
      ? ["query", "warn", "error"]
      : ["warn", "error"],
});

module.exports = prisma;
