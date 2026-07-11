"use client";
import Image from "next/image";
import { Watch, Wallet } from "lucide-react";
import { motion, type Variants } from "framer-motion";

interface Props {
  className?: string;
}

const categories = [
  { label: "Watches", type: "watch" as const },
  { label: "Wallets", type: "wallet" as const },
  { label: "Perfumes", type: "perfume" as const },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AuthHeroPanel({ className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-aura-black ${className}`}>
      {/* Background image — centered so products are visible */}
      <Image
        src="/images/banner.png"
        alt="Time Aura luxury products"
        fill
        priority
        sizes="(max-width: 1024px) 0vw, 55vw"
        className="object-cover object-[5%_center]"
      />

      {/* Maroon radial glow behind products (like reference) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 65% 50%, rgba(139, 30, 30, 0.35) 0%, transparent 55%)",
        }}
      />

      {/* Left-to-right gradient — DARK on left for text, TRANSPARENT on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/10" />

      {/* Subtle bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 xl:p-10">
        {/* Logo */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-aura-gold/70">
            <Watch className="h-7 w-7 text-aura-gold" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="font-cinzel text-2xl font-bold uppercase tracking-[0.2em] text-white xl:text-3xl">
              Time Aura
            </h1>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/70 xl:text-xs">
              Timeless Style. Precision You Trust.
            </p>
          </div>
        </motion.div>

        {/* Middle Content */}
        <div className="flex flex-col">
          <motion.div
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <h2 className="font-anton text-7xl uppercase leading-none text-white drop-shadow-2xl xl:text-8xl">
              Elevate
            </h2>
            <p className="-mt-2 font-dancing text-5xl text-aura-amber drop-shadow-lg xl:text-6xl">
              Every Moment
            </p>
            <div className="mt-4 h-[3px] w-16 rounded bg-aura-amber" />
          </motion.div>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 max-w-[300px] text-sm leading-relaxed text-white/80 drop-shadow-md"
          >
            Premium watches. Signature fragrances. Timeless wallets. Crafted for
            those who value style, quality, and authenticity.
          </motion.p>
        </div>

        {/* Category icons */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex items-start gap-6"
        >
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-aura-gold/70 bg-black/30 backdrop-blur-sm transition-transform hover:scale-105">
                {cat.type === "watch" && (
                  <Watch className="h-6 w-6 text-aura-gold" strokeWidth={1.5} />
                )}
                {cat.type === "wallet" && (
                  <Wallet
                    className="h-6 w-6 text-aura-gold"
                    strokeWidth={1.5}
                  />
                )}
                {cat.type === "perfume" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-aura-gold"
                  >
                    <rect x="8" y="2" width="8" height="3" rx="1" />
                    <path d="M9 5v2.5" />
                    <path d="M15 5v2.5" />
                    <rect x="6" y="7.5" width="12" height="14" rx="2" />
                    <path d="M9 12h6" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white drop-shadow-md">
                {cat.label}
              </span>
              <div className="h-[2px] w-6 rounded bg-aura-amber" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}