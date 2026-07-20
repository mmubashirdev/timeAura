// backend/src/features/products/products.routes.js
const express = require("express");
const productsController = require("./products.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const validateQuery = require("../../shared/middlewares/validateQuery");
const validateRequest = require("../../shared/middlewares/validateRequest");
const authGuard = require("../../shared/middlewares/authGuard");
const {
  listProductsSchema,
  createProductSchema,
  updateProductSchema,
} = require("./products.validation");

const router = express.Router();

router.get("/filters", asyncHandler(productsController.getFilters));
router.get("/:slug/related", asyncHandler(productsController.getRelated));
router.get("/id/:id", asyncHandler(productsController.getById));

// NOTE: GET / must be before GET /:slug so the wildcard doesn't swallow list requests
router.get(
  "/",
  validateQuery(listProductsSchema),
  asyncHandler(productsController.list)
);

router.get("/:slug", asyncHandler(productsController.getBySlug));

// Admin-only routes
router.post(
  "/",
  authGuard("ADMIN"),
  validateRequest(createProductSchema),
  asyncHandler(productsController.create)
);

router.put(
  "/:id",
  authGuard("ADMIN"),
  validateRequest(updateProductSchema),
  asyncHandler(productsController.update)
);

router.delete(
  "/:id",
  authGuard("ADMIN"),
  asyncHandler(productsController.delete)
);

router.post(
  "/:id/adjust-stock",
  authGuard("ADMIN"),
  asyncHandler(productsController.adjustStock)
);

module.exports = router;
