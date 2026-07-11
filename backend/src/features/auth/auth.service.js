const authRepository = require("./auth.repository");
const { hash, compare } = require("../../shared/utils/password");
const { generateOtp, hashOtp, compareOtp } = require("../../shared/utils/otp");
const { sendMail } = require("../../shared/utils/mailer");
const { verifyGoogleIdToken } = require("../../shared/utils/googleAuth");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../shared/utils/jwt");
const {
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} = require("../../shared/errors/AppError");
const roles = require("../../shared/constants/roles");
const env = require("../../../config/env");
const {
  otpTemplate,
  otpPlainText,
} = require("../../shared/utils/emailTemplate");

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };
}

function issueTokens(user) {
  const payload = { sub: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({
    ...payload,
    tokenVersion: user.refreshTokenVersion,
  });
  return { accessToken, refreshToken };
}

const OTP_TEMPLATES = {
  EMAIL_VERIFICATION: (code) => ({
    subject: "Your Time Aura Verification Code",
    html: otpTemplate({
      title: "Verify Your Email",
      heading: "Welcome to Time Aura",
      message:
        "Thank you for joining Time Aura. Please use the verification code below to activate your account.",
      code,
      buttonText: "Verify Account",
      footer:
        "If you didn't create this account, you can safely ignore this email.",
    }),
  }),

  PASSWORD_RESET: (code) => ({
    subject: "Reset your Time Aura password",
    html: otpTemplate({
      title: "Reset Password",
      heading: "Password Reset Request",
      message:
        "We received a request to reset your password. Use the code below to continue.",
      code,
      buttonText: "Reset Password",
      footer:
        "If you didn't request a password reset, simply ignore this email.",
    }),
  }),
};

class AuthService {
  async #issueAndSendOtp(user, type) {
    await authRepository.invalidateActiveOtps(user.id, type);

    const code = generateOtp();
    const codeHash = hashOtp(code);
    const expiresAt = new Date(
      Date.now() + Number(env.OTP_TTL_MINUTES) * 60 * 1000,
    );

    await authRepository.createOtp({
      userId: user.id,
      type,
      codeHash,
      expiresAt,
    });

    const { subject, html } = OTP_TEMPLATES[type](code);

    // Plain-text alternative improves deliverability without changing the HTML.
    const text = otpPlainText({
      heading:
        type === "EMAIL_VERIFICATION"
          ? "Welcome to Time Aura"
          : "Password Reset Request",
      message:
        type === "EMAIL_VERIFICATION"
          ? "Thank you for joining Time Aura. Please use the verification code below to activate your account."
          : "We received a request to reset your password. Use the code below to continue.",
      code,
      footer:
        type === "EMAIL_VERIFICATION"
          ? "If you didn't create this account, you can safely ignore this email."
          : "If you didn't request a password reset, simply ignore this email.",
    });

    await sendMail({ to: user.email, subject, html, text });
  }

  async #verifyOtp(user, type, code) {
    const otp = await authRepository.findLatestActiveOtp(user.id, type);

    // Same generic failure path for "no code", "expired", and "wrong code" —
    // don't let the response shape tell an attacker which case they hit.
    if (!otp || otp.expiresAt < new Date()) {
      throw new UnauthorizedError("Invalid or expired code");
    }
    if (otp.attempts >= Number(env.OTP_MAX_ATTEMPTS)) {
      throw new ForbiddenError(
        "Too many incorrect attempts. Please request a new code.",
      );
    }
    if (!compareOtp(code, otp.codeHash)) {
      await authRepository.incrementOtpAttempts(otp.id);
      throw new UnauthorizedError("Invalid or expired code");
    }

    await authRepository.consumeOtp(otp.id);
  }

  async register({ name, email, password }) {
    const existing = await authRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError("An account with this email already exists");
    }

    const passwordHash = await hash(password);
    const user = await authRepository.create({
      name,
      email,
      passwordHash,
      role: roles.STAFF,
    });

    await this.#issueAndSendOtp(user, "EMAIL_VERIFICATION");

    // Deliberately no tokens returned — an unverified account cannot log in yet.
    return {
      message:
        "Registration successful. Check your email for a verification code.",
    };
  }

  async googleLogin({ idToken }) {
    const { googleId, email, emailVerified, name } =
      await verifyGoogleIdToken(idToken);

    if (!emailVerified) {
      throw new UnauthorizedError("Google account email is not verified");
    }

    let user = await authRepository.findByGoogleId(googleId);

    if (!user) {
      user = await authRepository.findByEmail(email);

      if (user) {
        // Same email already registered locally — link accounts rather than
        // creating a duplicate. Avoids a confusing "email already exists" dead end.
        user = await authRepository.linkGoogleId(user.id, googleId);
      } else {
        user = await authRepository.createGoogleUser({
          name,
          email,
          googleId,
          role: roles.STAFF,
        });
      }
    }

    const tokens = issueTokens(user);
    return { user: toSafeUser(user), ...tokens };
  }

  async verifyEmail({ email, code }) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("Account not found");
    }
    if (user.isEmailVerified) {
      throw new ConflictError("Email is already verified");
    }

    await this.#verifyOtp(user, "EMAIL_VERIFICATION", code);
    await authRepository.markEmailVerified(user.id);

    return { message: "Email verified successfully. You can now log in." };
  }

  async resendVerificationOtp({ email }) {
    const user = await authRepository.findByEmail(email);

    // Same response whether or not the account exists — don't leak which emails are registered.
    if (user && !user.isEmailVerified) {
      await this.#issueAndSendOtp(user, "EMAIL_VERIFICATION");
    }

    return {
      message:
        "If an account with that email exists and is unverified, a new code has been sent.",
    };
  }

  async googleLogin(req, res) {
    const { user, accessToken, refreshToken } = await authService.googleLogin(
      req.body,
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    sendResponse(res, { message: "Logged in", data: { user, accessToken } });
  }

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.passwordHash) {
      throw new UnauthorizedError(
        "This account uses Google sign-in. Please continue with Google.",
      );
    }

    const passwordMatches = await compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.isEmailVerified) {
      throw new ForbiddenError("Please verify your email before logging in");
    }

    const tokens = issueTokens(user);
    return { user: toSafeUser(user), ...tokens };
  }

  async getById(userId) {
    const user = await authRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");
    return toSafeUser(user);
  }

  async forgotPassword({ email }) {
    const user = await authRepository.findByEmail(email);

    if (user) {
      await this.#issueAndSendOtp(user, "PASSWORD_RESET");
    }

    return {
      message:
        "If an account with that email exists, a reset code has been sent.",
    };
  }

  async resetPassword({ email, code, newPassword }) {
    const user = await authRepository.findByEmail(email);

    // Generic error for both "no such account" and "wrong code" — this is an
    // unauthenticated public endpoint, so it must not become an email-enumeration oracle.
    if (!user) {
      throw new UnauthorizedError("Invalid code or email");
    }

    try {
      await this.#verifyOtp(user, "PASSWORD_RESET", code);
    } catch {
      throw new UnauthorizedError("Invalid code or email");
    }

    const passwordHash = await hash(newPassword);
    await authRepository.updatePasswordAndBumpVersion(user.id, passwordHash);

    return {
      message:
        "Password reset successful. Please log in with your new password.",
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedError("Missing refresh token");
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const user = await authRepository.findById(payload.sub);
    if (!user || user.refreshTokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedError("Refresh token has been invalidated");
    }

    const tokens = issueTokens(user);
    return { user: toSafeUser(user), ...tokens };
  }

  async logout(userId) {
    await authRepository.incrementTokenVersion(userId);
  }
}

module.exports = new AuthService();
