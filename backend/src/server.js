const app = require("./app");
const env = require("../config/env");

// Temporary debug — remove after confirming DB URL
console.log("DATABASE_URL host:", process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "NOT SET");

const server = app.listen(env.PORT, () => {
  console.log(`Time Aura backend running on port ${env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection, shutting down:", err);
  server.close(() => process.exit(1));
});
