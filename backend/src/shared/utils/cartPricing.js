const CART_CONFIG = {
  freeShippingThreshold: 5000, // PKR
  shippingFlat: 250, // PKR
  taxRate: 0.135, // 13.5%
};

function calcDiscount(subtotal, coupon) {
  if (!coupon) return 0;
  if (coupon.type === "PERCENT")
    return Math.round((subtotal * coupon.value) / 100);
  return Math.min(subtotal, coupon.value);
}

function calcShipping(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= CART_CONFIG.freeShippingThreshold
    ? 0
    : CART_CONFIG.shippingFlat;
}

function calcTax(subtotal, discount = 0) {
  const taxable = Math.max(0, subtotal - discount);
  return Math.round(taxable * CART_CONFIG.taxRate);
}

function calcTotal({ subtotal, shipping, tax, discount }) {
  return Math.max(0, subtotal + shipping + tax - discount);
}

module.exports = {
  CART_CONFIG,
  calcDiscount,
  calcShipping,
  calcTax,
  calcTotal,
};
