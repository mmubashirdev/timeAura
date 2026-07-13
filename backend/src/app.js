const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const pinoHttp = require("pino-http");

const authRoutes = require("./features/auth/auth.routes");
const errorHandler = require("./shared/middlewares/errorHandler");
const { NotFoundError } = require("./shared/errors/AppError");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000" ||   "https://frontend.ngrok-free.app",
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(pinoHttp());

app.use("/api/v1/auth", authRoutes);

// Anything unmatched falls through to a consistent 404, not Express's default HTML page
app.use((req, res, next) =>
  next(new NotFoundError(`Route ${req.originalUrl} not found`)),
);

app.use(errorHandler); // must be registered LAST

module.exports = app;
