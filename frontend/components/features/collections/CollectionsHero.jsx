"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CollectionsHero() {
  return (
    <section className="w-full bg-[#faf5f2]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-xs text-neutral-500 mb-4"
          >
            <Link href="/" className="hover:text-[#800020]">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#800020] font-semibold">Shop</span>
          </nav>
          <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-3">
            Our Collection
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
            Explore our handpicked selection of watches, wallets, and perfumes
            crafted for those who value timeless style.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[16/9] w-full"
        >
          <Image
            src="/images/products/hero-composition.png"
            alt="Time Aura curated products"
            fill
            className="object-contain"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
