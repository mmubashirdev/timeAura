const authService = require("./auth.service");
const sendResponse = require("../../shared/utils/sendResponse");
const httpStatus = require("../../shared/constants/httpStatus");
const env = require("../../config/env");

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/v1/auth", // cookie only sent to auth routes, not the whole API surface
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

class AuthController {
  async register(req, res) {
    const { user, accessToken, refreshToken } = await authService.register(
      req.body,
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Account created",
      data: { user, accessToken },
    });
  }

  async login(req, res) {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body,
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    sendResponse(res, { message: "Logged in", data: { user, accessToken } });
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
}

module.exports = new AuthController();
