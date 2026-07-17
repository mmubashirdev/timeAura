// backend/src/features/cart/cart.repository.js
const prisma = require("../../../config/prisma");

class CartRepository {
  findByUserId(userId) {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  }

  findByGuestToken(guestToken) {
    return prisma.cart.findUnique({
      where: { guestToken },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  }

  createForUser(userId) {
    return prisma.cart.create({
      data: { userId },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  }

  createForGuest(guestToken) {
    return prisma.cart.create({
      data: { guestToken },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    });
  }

  upsertItem(cartId, productId, quantity) {
    return prisma.cartItem.upsert({
      where: { cartId_productId: { cartId, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId, productId, quantity },
    });
  }

  setItemQuantity(cartId, productId, quantity) {
    return prisma.cartItem.update({
      where: { cartId_productId: { cartId, productId } },
      data: { quantity },
    });
  }

  removeItem(cartId, productId) {
    return prisma.cartItem.delete({
      where: { cartId_productId: { cartId, productId } },
    });
  }

  clearItems(cartId) {
    return prisma.cartItem.deleteMany({ where: { cartId } });
  }

  setCoupon(cartId, couponCode) {
    return prisma.cart.update({ where: { id: cartId }, data: { couponCode } });
  }

  findCoupon(code) {
    return prisma.coupon.findFirst({ where: { code, isActive: true } });
  }

  deleteCart(cartId) {
    return prisma.cart.delete({ where: { id: cartId } });
  }

  attachUserToCart(cartId, userId) {
    return prisma.cart.update({
      where: { id: cartId },
      data: { userId, guestToken: null },
    });
  }
}

module.exports = new CartRepository();
