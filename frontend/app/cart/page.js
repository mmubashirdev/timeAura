"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";
import TrustStrip from "@/components/features/collections/TrustStrip";

import CartItem from "@/components/features/cart/CartItem";
import CartSummary from "@/components/features/cart/CartSummary";
import EmptyCart from "@/components/features/cart/EmptyCart";
import RecommendedProducts from "@/components/features/cart/RecommendedProducts";

import { useCart } from "@/hooks/useCart";
import { PRODUCTS } from "@/lib/data/products";
import { calcDiscount, calcShipping, calcTax, calcTotal } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, remove, update, increment, decrement } = useCart();
  const [coupon, setCoupon] = useState(null);

  // Enrich cart items with full product data (variant, brand, compareAtPrice, etc.)
  const enrichedItems = useMemo(() => {
    return items.map((item) => {
      const full = PRODUCTS.find((p) => p.id === item.id);
      return { ...full, ...item };
    });
  }, [items]);

  // Recommend items from PRODUCTS not currently in the cart
  const recommended = useMemo(() => {
    const inCart = new Set(items.map((i) => i.id));
    const pool = PRODUCTS.filter((p) => !inCart.has(p.id));
    // Mix categories: take a couple from each
    const cats = ["watches", "wallets", "perfumes"];
    const picks = [];
    cats.forEach((cat) => {
      pool
        .filter((p) => p.category === cat)
        .slice(0, 2)
        .forEach((p) => picks.push(p));
    });
    return picks.slice(0, 6);
  }, [items]);

  const discount = calcDiscount(subtotal, coupon);
  const shipping = calcShipping(subtotal);
  const tax = calcTax(subtotal, discount);
  const total = calcTotal({ subtotal, shipping, tax, discount });

  const isEmpty = items.length === 0;

  return (
    <main className="w-full bg-[#FAFAFA] text-neutral-900 overflow-x-hidden min-h-screen">
      <AnnouncementBar />
      <Navbar activePath="/cart" />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-10"
      >
        {/* Heading + breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral-900">
              Shopping Cart
            </h1>
            <nav className="flex items-center text-sm text-neutral-500 mt-2">
              <Link href="/" className="hover:text-[#800020] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-neutral-400" />
              <span className="text-[#800020] font-medium">Cart</span>
            </nav>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <ShieldCheck className="w-5 h-5 text-[#C9A14A]" strokeWidth={1.8} />
            <span>Secure Checkout</span>
          </div>
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column — items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-neutral-100 rounded-2xl p-4 md:p-6 shadow-sm">
                <AnimatePresence initial={false}>
                  {enrichedItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16, height: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      <CartItem
                        item={item}
                        onIncrement={() => increment(item.id)}
                        onDecrement={() => decrement(item.id)}
                        onQtyChange={(q) => update(item.id, q)}
                        onRemove={() => remove(item.id)}
                        isLast={i === enrichedItems.length - 1}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="pt-4 mt-2">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#800020] hover:text-[#5c0016] transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column — summary */}
            <div className="lg:col-span-1">
              <CartSummary
                itemCount={items.reduce((s, i) => s + i.qty, 0)}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                coupon={coupon}
                onApplyCoupon={setCoupon}
                onRemoveCoupon={() => setCoupon(null)}
              />
            </div>
          </div>
        )}

        {!isEmpty && recommended.length > 0 && (
          <RecommendedProducts products={recommended} />
        )}
      </motion.section>

      <TrustStrip />
      <Footer />
    </main>
  );
}
