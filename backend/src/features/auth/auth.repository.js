const prisma = require("../../config/prisma");

// The ONLY file in the app allowed to talk to Prisma for User data.
// If you swap Prisma for Drizzle tomorrow, this is the only file that changes.
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
}

module.exports = new AuthRepository();
