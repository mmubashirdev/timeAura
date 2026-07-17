// backend/src/features/customers/customers.routes.js
const express = require("express");
const customersController = require("./customers.controller");
const authGuard = require("../../shared/middlewares/authGuard");
const asyncHandler = require("../../shared/utils/asyncHandler");

const router = express.Router();

// All customer routes require admin privileges
router.use(authGuard("ADMIN"));

router.get("/", asyncHandler(customersController.getCustomers));
router.get("/:id", asyncHandler(customersController.getCustomer));

module.exports = router;
