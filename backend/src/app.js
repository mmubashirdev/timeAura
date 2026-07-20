const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const pinoHttp = require("pino-http");

const authRoutes = require("./features/auth/auth.routes");
const productRoutes = require("./features/products/products.routes");
const cartRoutes = require("./features/cart/cart.routes");
const categoryRoutes = require("./features/categories/categories.routes");
const orderRoutes = require("./features/orders/orders.routes");
const uploadRoutes = require("./features/uploads/uploads.routes");
const customerRoutes = require("./features/customers/customers.routes");
const notificationRoutes = require("./features/notifications/notifications.routes");
const errorHandler = require("./shared/middlewares/errorHandler");
const { NotFoundError } = require("./shared/errors/AppError");

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "https://time-aura-zeta.vercel.app",
      "https://frontend.ngrok-free.app"
    ].filter(Boolean),
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(pinoHttp());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// Anything unmatched falls through to a consistent 404, not Express's default HTML page
app.use((req, res, next) =>
  next(new NotFoundError(`Route ${req.originalUrl} not found`)),
);

app.use(errorHandler); // must be registered LAST

module.exports = app;
