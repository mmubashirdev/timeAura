// backend/src/features/cart/cart.service.js
const crypto = require("crypto");
const cartRepository = require("./cart.repository");
const {
  CART_CONFIG,
  calcDiscount,
  calcShipping,
  calcTax,
  calcTotal,
} = require("../../shared/utils/cartPricing");
const {
  NotFoundError,
  ConflictError,
} = require("../../shared/errors/AppError");

function toItemDTO(item) {
  return {
    id: item.product.id,
    slug: item.product.slug,
    name: item.product.name,
    category: item.product.category.slug,
    categoryLabel: item.product.category.slug.toUpperCase(),
    brand: item.product.brand,
    material: item.product.material,
    color: item.product.color,
    price: item.product.basePrice,
    compareAtPrice: item.product.compareAtPrice,
    image: item.product.image,
    qty: item.quantity,
  };
}

class CartService {
  async #resolveCart(owner) {
    if (owner.userId) {
      let cart = await cartRepository.findByUserId(owner.userId);
      if (!cart) cart = await cartRepository.createForUser(owner.userId);
      return cart;
    }
    let cart = await cartRepository.findByGuestToken(owner.guestToken);
    if (!cart) cart = await cartRepository.createForGuest(owner.guestToken);
    return cart;
  }

  async #buildResponse(cart) {
    const items = cart.items.map(toItemDTO);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    let coupon = null;
    if (cart.couponCode) {
      const found = await cartRepository.findCoupon(cart.couponCode);
      if (found)
        coupon = {
          code: found.code,
          type: found.type,
          value: found.value,
          label: found.label,
        };
    }

    const discount = calcDiscount(subtotal, coupon);
    const shipping = calcShipping(subtotal);
    const tax = calcTax(subtotal, discount);
    const total = calcTotal({ subtotal, shipping, tax, discount });

    return {
      items,
      itemCount: items.reduce((s, i) => s + i.qty, 0),
      subtotal,
      shipping,
      tax,
      discount,
      total,
      coupon,
      freeShippingThreshold: CART_CONFIG.freeShippingThreshold,
    };
  }

  async getCart(owner) {
    const cart = await this.#resolveCart(owner);
    return this.#buildResponse(cart);
  }

  async addItem(owner, productId, quantity) {
    const cart = await this.#resolveCart(owner);
    await cartRepository.upsertItem(cart.id, productId, quantity);
    return this.getCart(owner);
  }

  async updateItem(owner, productId, quantity) {
    const cart = await this.#resolveCart(owner);
    try {
      await cartRepository.setItemQuantity(cart.id, productId, quantity);
    } catch {
      throw new NotFoundError("Item not found in cart");
    }
    return this.getCart(owner);
  }

  async removeItem(owner, productId) {
    const cart = await this.#resolveCart(owner);
    try {
      await cartRepository.removeItem(cart.id, productId);
    } catch {
      throw new NotFoundError("Item not found in cart");
    }
    return this.getCart(owner);
  }

  async clearCart(owner) {
    const cart = await this.#resolveCart(owner);
    await cartRepository.clearItems(cart.id);
    return this.getCart(owner);
  }

  async applyCoupon(owner, code) {
    const cart = await this.#resolveCart(owner);
    const coupon = await cartRepository.findCoupon(code.trim().toUpperCase());
    if (!coupon) throw new NotFoundError("Invalid coupon code");
    await cartRepository.setCoupon(cart.id, coupon.code);
    return this.getCart(owner);
  }

  async removeCoupon(owner) {
    const cart = await this.#resolveCart(owner);
    await cartRepository.setCoupon(cart.id, null);
    return this.getCart(owner);
  }

  // Called right after login: folds the guest cart (identified by cookie)
  // plus any client-held items (e.g. from localStorage) into the user's cart.
  async mergeGuestCart(userId, guestToken, extraItems = []) {
    let userCart = await cartRepository.findByUserId(userId);
    if (!userCart) userCart = await cartRepository.createForUser(userId);

    if (guestToken) {
      const guestCart = await cartRepository.findByGuestToken(guestToken);
      if (guestCart && guestCart.id !== userCart.id) {
        for (const item of guestCart.items) {
          await cartRepository.upsertItem(
            userCart.id,
            item.productId,
            item.quantity,
          );
        }
        await cartRepository.deleteCart(guestCart.id);
      }
    }

    for (const item of extraItems) {
      await cartRepository.upsertItem(
        userCart.id,
        item.productId,
        item.quantity,
      );
    }

    return this.getCart({ userId });
  }

  generateGuestToken() {
    return crypto.randomUUID();
  }
}

module.exports = new CartService();
