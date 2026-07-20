"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TextType from "@/components/ui/TextType";
import {
  Play,
  ArrowRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Truck, title: "Free Worldwide Shipping", desc: "On all orders" },
  { icon: ShieldCheck, title: "2 Year Warranty", desc: "Premium coverage" },
  { icon: RefreshCw, title: "Easy Returns & Exchanges", desc: "Hassle free" },
  { icon: Award, title: "100% Authentic Products", desc: "Guaranteed quality" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full bg-gradient-to-br from-[#faf5f2] via-[#f5ebe6] to-[#efdfd6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 lg:py-24">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-4">
            DISCOVER PREMIUM LIFESTYLE PRODUCTS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-neutral-900 mb-6">
            SHOP PREMIUM. SHOP SMART. Moments,
            <br />
            Made for <span className="text-[#800020]">You.</span>
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed max-w-md mb-8">
            Discover{" "}
            <TextType
              as="span"
              text={["luxury watches.", "premium wallets.", "fine perfumes."]}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.5}
              loop={true}
              textColors={["#800020", "#C9A14A", "#800020"]}
              className="font-semibold"
            />
          </p>

          <div className="flex items-center gap-4 mb-12">
            <Button className="h-12 px-6 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white text-sm font-semibold gap-2">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>
            <button className="flex items-center gap-3 text-sm font-medium text-neutral-700 hover:text-[#800020] transition-colors">
              <span className="w-10 h-10 rounded-full border-2 border-[#800020] flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-[#800020] fill-[#800020] ml-0.5" />
              </span>
              Watch Story
            </button>
          </div>

          {/* Feature strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-2">
                <Icon
                  className="w-5 h-5 text-[#800020] shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                <div>
                  <div className="text-[11px] font-semibold text-neutral-900 leading-tight">
                    {title}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: product composition. The three <div data-fly-*> elements
            are the "fly-from" origins that GSAP will animate to the cards below. */}
        <div className="relative h-[420px] lg:h-[520px]">
          {/* Static background composition — decorative */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/products/hero-composition.png"
              alt=""
              fill
              priority
              className="object-contain object-center pointer-events-none select-none opacity-0"
              aria-hidden="true"
            />
          </div>

          {/* The three "flying" products. Positioned in the hero on load.
              Each gets its own id so ScrollAnimator can look them up. */}
          <div
            id="fly-wallet"
            data-fly="wallet"
            className="absolute left-[-15%] top-[30%] w-[70%] aspect-square"
          >
            <Image
              src="/images/products/wallet.png"
              alt="Time Aura leather wallet"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div
            id="fly-watch"
            data-fly="watch"
            className="absolute left-[-10%] top-[-10%] w-[60%] aspect-square z-10"
          >
            <Image
              src="/images/products/watch.png"
              alt="Time Aura Heritage watch"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div
            id="fly-perfume"
            data-fly="perfume"
            className="absolute right-[-12%] top-[-20%] w-[80%] aspect-[2/3]"
          >
            <Image
              src="/images/products/perfume.png"
              alt="Time Aura Oud Prestige perfume"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
