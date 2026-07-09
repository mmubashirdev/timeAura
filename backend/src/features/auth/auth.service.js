const authRepository = require("./auth.repository");
const { hash, compare } = require("../../shared/utils/password");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../shared/utils/jwt");
const {
  ConflictError,
  UnauthorizedError,
} = require("../../shared/errors/AppError");
const roles = require("../../shared/constants/roles");

function toSafeUser(user) {
  // Never let passwordHash leave this layer. This is the DTO boundary.
  return { id: user.id, name: user.name, email: user.email, role: user.role };
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

class AuthService {
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

    const tokens = issueTokens(user);
    return { user: toSafeUser(user), ...tokens };
  }

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);

    // Deliberately identical error for "no such user" and "wrong password".
    // Distinguishing them lets an attacker enumerate valid admin emails.
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const passwordMatches = await compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const tokens = issueTokens(user);
    return { user: toSafeUser(user), ...tokens };
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

    // If the DB's version has moved on (logout / password reset), reject.
    if (!user || user.refreshTokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedError("Refresh token has been invalidated");
    }

    const tokens = issueTokens(user); // rotation: old refresh token is now stale by role/version comparison
    return { user: toSafeUser(user), ...tokens };
  }

  async logout(userId) {
    await authRepository.incrementTokenVersion(userId);
  }
}

module.exports = new AuthService();
