"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Full-viewport edge-to-edge 50/50 split layout for auth pages.
 * - Left: brand hero image (hidden on mobile)
 * - Right: form content (children)
 */
export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAFAFA] flex">
      {/* Left: brand image */}
      <aside className="relative hidden lg:block lg:w-1/2 h-full bg-[#0a0508]">
        <Image
          src="/images/hero-luxury.png"
          alt="Time Aura — luxury watch, perfume and wallet"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        {/* Subtle gradient to blend with cream form panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />

        {/* Brand mark overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-10 left-10 right-10 text-white"
        >
          <p className="font-serif text-2xl tracking-[0.3em] text-[#C9A14A] mb-2">
            TIME AURA
          </p>
          <p className="text-xs tracking-[0.25em] text-white/70">
            TIMELESS STYLE. PRECISION YOU TRUST.
          </p>
        </motion.div>
      </aside>

      {/* Right: form */}
      <main className="w-full lg:w-1/2 h-full flex items-start justify-center overflow-hidden px-6 sm:px-10 lg:px-16 py-10">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
