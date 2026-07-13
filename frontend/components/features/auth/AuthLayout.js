"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Watch, Wallet, SprayCan } from "lucide-react";

const categories = [
  { icon: Watch, label: "WATCHES" },
  { icon: Wallet, label: "WALLETS" },
  { icon: SprayCan, label: "PERFUMES" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAFAFA] flex">
      {/* LEFT: hero image + branding overlay */}
      <aside className="relative hidden lg:block lg:w-1/2 h-full bg-[#0a0508]">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-y-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-luxury.jpeg')",
              left: "55", // pushes image left edge OFF-screen to the left
              top:"10%",
              right: "0", // image extends to right edge
              width: "70%", // image is 130% of container width
            }}
            role="img"
            aria-label="Time Aura — luxury watch, perfume and wallet"
          />
        </div>
        {/* Darken the image so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/25" />
        {/* Overlay content — logo top, tagline middle, categories bottom */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 xl:p-12 text-white">
          {/* Logo */}
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#C9A14A] flex items-center justify-center shrink-0">
              <Watch className="w-6 h-6 text-[#C9A14A]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-serif text-2xl xl:text-3xl font-bold tracking-[0.15em]">
                TIME AURA
              </h1>
              <p className="text-[9px] xl:text-[10px] tracking-[0.25em] text-white/70 mt-0.5">
                TIMELESS STYLE. PRECISION YOU TRUST.
              </p>
            </div>
          </motion.header>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-sm"
          >
            <h2 className="elevate-title font-serif text-5xl xl:text-6xl font-black leading-none uppercase tracking-wide">
              Elevate
            </h2>
            <p className="script-text text-3xl xl:text-4xl -mt-1 mb-4">
              Every Moment
            </p>
            <div
              className="w-14 h-[3px] bg-[#C9A14A] mb-4"
              aria-hidden="true"
            />
            <p className="text-white/85 text-sm leading-relaxed">
              Premium watches. Signature fragrances. Timeless wallets. Crafted
              for those who value style, quality, and authenticity.
            </p>
          </motion.div>

          {/* Category icons */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-6 xl:gap-8"
          >
            {categories.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-full border border-[#C9A14A]/60 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9A14A]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] tracking-[0.2em] text-white/80">
                  {label}
                </span>
                <div className="w-5 h-0.5 bg-[#C9A14A]" aria-hidden="true" />
              </li>
            ))}
          </motion.ul>
        </div>
      </aside>

      {/* RIGHT: form */}
      <main className="w-full lg:w-1/2 h-full flex items-center justify-center overflow-y-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-6">
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
