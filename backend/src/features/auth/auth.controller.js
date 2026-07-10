const authService = require("./auth.service");
const sendResponse = require("../../shared/utils/sendResponse");
const httpStatus = require("../../shared/constants/httpStatus");
const env = require("../../../config/env");

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/v1/auth", // cookie only sent to auth routes, not the whole API surface
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

class AuthController {
  async register(req, res) {
    const result = await authService.register(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: result.message,
      data: null,
    });
  }

  async login(req, res) {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body,
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    sendResponse(res, { message: "Logged in", data: { user, accessToken } });
  }

  async me(req, res) {
    const user = await authService.getById(req.user.sub);
    sendResponse(res, { message: "OK", data: { user } });
  }
  
  async refresh(req, res) {
    const { user, accessToken, refreshToken } = await authService.refresh(
      req.cookies.refreshToken,
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    sendResponse(res, {
      message: "Token refreshed",
      data: { user, accessToken },
    });
  }

  async logout(req, res) {
    await authService.logout(req.user.sub);
    res.clearCookie("refreshToken", { path: "/api/v1/auth" });
    sendResponse(res, { message: "Logged out" });
  }

  async verifyEmail(req, res) {
    const result = await authService.verifyEmail(req.body);
    sendResponse(res, { message: result.message });
  }

  async resendVerification(req, res) {
    const result = await authService.resendVerificationOtp(req.body);
    sendResponse(res, { message: result.message });
  }

  async forgotPassword(req, res) {
    const result = await authService.forgotPassword(req.body);
    sendResponse(res, { message: result.message });
  }

  async resetPassword(req, res) {
    const result = await authService.resetPassword(req.body);
    sendResponse(res, { message: result.message });
  }
}

module.exports = new AuthController();
