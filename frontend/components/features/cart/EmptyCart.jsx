"use client";

import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-neutral-100 rounded-2xl py-16 px-6 text-center shadow-sm"
    >
      {/* Luxury illustration — layered rings + bag */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#C9A14A]/30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border-2 border-dashed border-[#800020]/20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#800020] to-[#5c0016] flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-9 h-9 text-white" strokeWidth={1.6} />
          </div>
        </div>
        <Sparkles className="absolute top-2 right-4 w-4 h-4 text-[#C9A14A]" />
        <Sparkles className="absolute bottom-4 left-2 w-3 h-3 text-[#C9A14A]" />
      </div>

      <h2 className="font-serif text-3xl text-neutral-900 mb-2">
        Your cart is waiting.
      </h2>
      <p className="text-neutral-500 max-w-md mx-auto mb-6">
        Discover timeless pieces crafted for those who value the finer things.
      </p>

      <Link
        href="/collections"
        className="inline-flex items-center gap-2 h-12 px-8 rounded-2xl bg-[#800020] hover:bg-[#5c0016] text-white text-sm font-semibold tracking-wide transition-colors shadow-sm hover:shadow-md"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}
