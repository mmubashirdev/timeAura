// Cart pricing constants — tweak here, applies everywhere
export const CART_CONFIG = {
  freeShippingThreshold: 5000, // PKR
  shippingFlat: 250, // PKR
  taxRate: 0.135, // 13.5%
};

// Local coupon mocks. Replace with API call when backend is ready.
const COUPONS = {
  AURA10: { type: "percent", value: 10, label: "10% off" },
  FIRST100: { type: "flat", value: 1000, label: "PKR 1000 off" },
};

export function validateCoupon(code) {
  if (!code) return null;
  const c = COUPONS[code.trim().toUpperCase()];
  if (!c) return null;
  return { code: code.trim().toUpperCase(), ...c };
}

export function calcDiscount(subtotal, coupon) {
  if (!coupon) return 0;
  if (coupon.type === "percent")
    return Math.round((subtotal * coupon.value) / 100);
  return Math.min(subtotal, coupon.value);
}

export function calcShipping(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= CART_CONFIG.freeShippingThreshold
    ? 0
    : CART_CONFIG.shippingFlat;
}

export function calcTax(subtotal, discount = 0) {
  const taxable = Math.max(0, subtotal - discount);
  return Math.round(taxable * CART_CONFIG.taxRate);
}

export function calcTotal({ subtotal, shipping, tax, discount }) {
  return Math.max(0, subtotal + shipping + tax - discount);
}
