const app = require("./app");
const env = require("./config/env");

const server = app.listen(env.PORT, () => {
  console.log(`Time Aura backend running on port ${env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection, shutting down:", err);
  server.close(() => process.exit(1));
});
