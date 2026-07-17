// backend/src/features/uploads/uploads.routes.js
const express = require("express");
const multer = require("multer");
const uploadsController = require("./uploads.controller");
const asyncHandler = require("../../shared/utils/asyncHandler");
const authGuard = require("../../shared/middlewares/authGuard");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

router.post(
  "/single",
  authGuard("ADMIN"),
  upload.single("image"),
  asyncHandler(uploadsController.uploadSingle)
);

router.post(
  "/multiple",
  authGuard("ADMIN"),
  upload.array("images", 10), // Max 10 images
  asyncHandler(uploadsController.uploadMultiple)
);

module.exports = router;
