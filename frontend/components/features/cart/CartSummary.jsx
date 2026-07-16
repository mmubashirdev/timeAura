"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ShieldCheck, Truck, RefreshCw, X, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/format";
import { validateCoupon, CART_CONFIG } from "@/lib/cart";

export default function CartSummary({
  itemCount,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  coupon,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error("Enter a coupon code");
      return;
    }
    setApplying(true);
    // Simulate a tiny latency so the loading state is visible
    await new Promise((r) => setTimeout(r, 400));
    const valid = validateCoupon(code);
    setApplying(false);
    if (!valid) {
      toast.error("Invalid coupon code");
      return;
    }
    onApplyCoupon(valid);
    setCode("");
    toast.success(`Coupon applied: ${valid.label}`);
  };

  const remainingForFreeShip = CART_CONFIG.freeShippingThreshold - subtotal;

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-neutral-900 mb-4">
          Order Summary
        </h2>

        {/* Free shipping progress */}
        {shipping > 0 && remainingForFreeShip > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-[#faf5f2] text-xs text-neutral-700">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-3.5 h-3.5 text-[#800020]" />
              <span>
                Add{" "}
                <strong className="text-[#800020]">
                  {formatPKR(remainingForFreeShip)}
                </strong>{" "}
                more for free shipping
              </span>
            </div>
            <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (subtotal / CART_CONFIG.freeShippingThreshold) * 100)}%`,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-[#800020]"
              />
            </div>
          </div>
        )}

        <dl className="space-y-3 text-sm">
          <Row
            label={`Subtotal (${itemCount} item${itemCount === 1 ? "" : "s"})`}
            value={formatPKR(subtotal)}
          />
          <Row
            label="Shipping"
            value={shipping === 0 ? "Free" : formatPKR(shipping)}
            highlight={shipping === 0}
          />
          <Row label="Estimated Tax" value={formatPKR(tax)} />
          {discount > 0 && (
            <Row
              label="Discount"
              value={`- ${formatPKR(discount)}`}
              accent="discount"
            />
          )}
        </dl>

        {/* Applied coupon chip */}
        {coupon && (
          <div className="mt-4 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#C9A14A]/10 border border-[#C9A14A]/30">
            <div className="flex items-center gap-2 text-xs">
              <Tag className="w-3.5 h-3.5 text-[#C9A14A]" />
              <span className="font-semibold text-neutral-900">
                {coupon.code}
              </span>
              <span className="text-neutral-600">— {coupon.label}</span>
            </div>
            <button
              onClick={onRemoveCoupon}
              aria-label="Remove coupon"
              className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-500 hover:text-[#800020] hover:bg-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Coupon input */}
        {!coupon && (
          <div className="mt-4">
            <label
              htmlFor="coupon"
              className="block text-xs font-medium text-neutral-700 mb-2"
            >
              Have a coupon?
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                type="text"
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                className="flex-1 h-10 px-3 rounded-xl border border-neutral-200 bg-white text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 transition-all"
              />
              <Button
                onClick={handleApply}
                disabled={applying}
                className="h-10 px-4 rounded-xl bg-[#800020] hover:bg-[#5c0016] text-white text-xs font-semibold tracking-wide"
              >
                {applying ? "..." : "Apply"}
              </Button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1.5">
              Try <span className="font-mono">AURA10</span> or{" "}
              <span className="font-mono">FIRST100</span>
            </p>
          </div>
        )}

        {/* Total */}
        <div className="mt-5 pt-4 border-t border-neutral-200">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-xl text-neutral-900">Total</span>
            <motion.span
              key={total}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-2xl text-[#800020]"
            >
              {formatPKR(total)}
            </motion.span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">
            Inclusive of all taxes
          </p>
        </div>

        {/* Checkout */}
        <motion.div whileTap={{ scale: 0.98 }} className="mt-5">
          <Button
            disabled={itemCount === 0}
            className="w-full h-12 rounded-2xl bg-[#800020] hover:bg-[#5c0016] text-white text-sm font-semibold tracking-wide disabled:opacity-50"
          >
            <Lock className="w-4 h-4" /> Proceed to Checkout
          </Button>
        </motion.div>

        <Link
          href="/collections"
          className="mt-3 block w-full h-12 rounded-2xl border border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white text-sm font-semibold tracking-wide flex items-center justify-center transition-colors"
        >
          Continue Shopping
        </Link>

        <p className="text-center text-[10px] text-neutral-500 mt-4">
          Secure SSL encrypted checkout
        </p>
      </div>

      {/* Trust icons row */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm grid grid-cols-3 gap-2 text-center">
        <TrustPill icon={ShieldCheck} label="Secure Payment" />
        <TrustPill icon={Truck} label="Fast Delivery" />
        <TrustPill icon={RefreshCw} label="Easy Returns" />
      </div>
    </div>
  );
}

function Row({ label, value, highlight = false, accent }) {
  const valueClass =
    accent === "discount"
      ? "text-[#800020] font-semibold"
      : highlight
        ? "text-green-600 font-semibold"
        : "text-neutral-900 font-medium";
  return (
    <div className="flex justify-between items-center">
      <dt className="text-neutral-600">{label}</dt>
      <dd className={valueClass}>{value}</dd>
    </div>
  );
}

function TrustPill({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <div className="w-9 h-9 rounded-full bg-[#faf5f2] flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#C9A14A]" strokeWidth={1.8} />
      </div>
      <span className="text-[10px] text-neutral-600 leading-tight font-medium">
        {label}
      </span>
    </div>
  );
}
