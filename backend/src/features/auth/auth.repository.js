const prisma = require("../../../config/prisma");

class AuthRepository {
  findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  create({ name, email, passwordHash, role }) {
    return prisma.user.create({ data: { name, email, passwordHash, role } });
  }

  incrementTokenVersion(userId) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshTokenVersion: { increment: 1 } },
    });
  }

  markEmailVerified(userId) {
    return prisma.user.update({
      where: { id: userId },
      data: { isEmailVerified: true },
    });
  }

  updatePasswordAndBumpVersion(userId, passwordHash) {
    // Bumping the token version here invalidates every existing session
    // the moment a password is reset — a stolen refresh token becomes useless.
    return prisma.user.update({
      where: { id: userId },
      data: { passwordHash, refreshTokenVersion: { increment: 1 } },
    });
  }

  createOtp({ userId, type, codeHash, expiresAt }) {
    return prisma.otpToken.create({
      data: { userId, type, codeHash, expiresAt },
    });
  }

  findLatestActiveOtp(userId, type) {
    return prisma.otpToken.findFirst({
      where: { userId, type, consumedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  consumeOtp(otpId) {
    return prisma.otpToken.update({
      where: { id: otpId },
      data: { consumedAt: new Date() },
    });
  }

  incrementOtpAttempts(otpId) {
    return prisma.otpToken.update({
      where: { id: otpId },
      data: { attempts: { increment: 1 } },
    });
  }

  invalidateActiveOtps(userId, type) {
    // Ensures only one valid code exists at a time — resending
    // shouldn't leave an old code silently valid alongside the new one.
    return prisma.otpToken.updateMany({
      where: { userId, type, consumedAt: null },
      data: { consumedAt: new Date() },
    });
  }
}

module.exports = new AuthRepository();
