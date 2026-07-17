// backend/src/features/uploads/uploads.controller.js
const uploadsService = require("./uploads.service");
const sendResponse = require("../../shared/utils/sendResponse");

class UploadsController {
  async uploadSingle(req, res) {
    const url = await uploadsService.uploadSingle(req.file);
    sendResponse(res, {
      message: "File uploaded successfully",
      data: { url },
    });
  }

  async uploadMultiple(req, res) {
    const urls = await uploadsService.uploadMultiple(req.files);
    sendResponse(res, {
      message: "Files uploaded successfully",
      data: { urls },
    });
  }
}

module.exports = new UploadsController();
