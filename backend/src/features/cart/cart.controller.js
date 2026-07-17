// backend/src/features/cart/cart.controller.js 
const cartService = require("./cart.service");
const sendResponse = require("../../shared/utils/sendResponse");
const { GUEST_COOKIE_OPTIONS } = require("./cart.constants");

class CartController {
  async getCart(req, res) {
    const data = await cartService.getCart(req.cartOwner);
    sendResponse(res, { message: "OK", data });
  }

  async addItem(req, res) {
    const { productId, quantity } = req.body;
    const data = await cartService.addItem(req.cartOwner, productId, quantity);
    sendResponse(res, { message: "Item added to cart", data });
  }

  async updateItem(req, res) {
    const productId = Number(req.params.productId);
    const { quantity } = req.body;
    const data = await cartService.updateItem(
      req.cartOwner,
      productId,
      quantity,
    );
    sendResponse(res, { message: "Cart updated", data });
  }

  async removeItem(req, res) {
    const productId = Number(req.params.productId);
    const data = await cartService.removeItem(req.cartOwner, productId);
    sendResponse(res, { message: "Item removed", data });
  }

  async clearCart(req, res) {
    const data = await cartService.clearCart(req.cartOwner);
    sendResponse(res, { message: "Cart cleared", data });
  }

  async applyCoupon(req, res) {
    const data = await cartService.applyCoupon(req.cartOwner, req.body.code);
    sendResponse(res, { message: "Coupon applied", data });
  }

  async removeCoupon(req, res) {
    const data = await cartService.removeCoupon(req.cartOwner);
    sendResponse(res, { message: "Coupon removed", data });
  }

  async mergeCart(req, res) {
    const guestToken = req.cookies.cartToken;
    const data = await cartService.mergeGuestCart(
      req.user.sub,
      guestToken,
      req.body.items,
    );
    res.clearCookie("cartToken", { path: "/api/v1/cart" });
    sendResponse(res, { message: "Cart merged", data });
  }
}

module.exports = new CartController();
