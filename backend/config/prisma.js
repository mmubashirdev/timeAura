const { PrismaClient } = require("../src/generated/prisma");
const env = require("./env");

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "production"
      ? ["error", "warn"]
      : ["query", "error", "warn"],
});

module.exports = prisma;
