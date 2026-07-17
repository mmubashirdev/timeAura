// backend/src/features/categories/categories.routes.js
const express = require("express");
const categoriesController = require("./categories.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const authGuard = require("../../shared/middlewares/authGuard");
const validateRequest = require("../../shared/middlewares/validateRequest");
const { createCategorySchema } = require("./categories.validation");

const router = express.Router();

router.get("/", asyncHandler(categoriesController.list));

router.post(
  "/",
  authGuard("ADMIN"),
  validateRequest(createCategorySchema),
  asyncHandler(categoriesController.create)
);

router.put(
  "/:id",
  authGuard("ADMIN"),
  validateRequest(createCategorySchema),
  asyncHandler(categoriesController.update)
);

router.delete(
  "/:id",
  authGuard("ADMIN"),
  asyncHandler(categoriesController.delete)
);

module.exports = router;
