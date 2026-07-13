"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutHero() {
  return (
    <section className="w-full bg-[#faf5f2]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-4">
            ABOUT TIME AURA
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-neutral-900 mb-6">
            Your Trusted Destination for Premium Lifestyle Products.
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed max-w-md mb-8">
            Time Aura is a curated marketplace connecting you with authentic
            products from trusted brands and verified sellers. Shop confidently,
            anytime, anywhere.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button className="h-12 px-6 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white text-sm font-semibold gap-2">
              Explore Products <ArrowRight className="w-4 h-4" />
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-2 border-neutral-300 hover:border-[#800020] hover:text-[#800020] text-sm font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[5/4] lg:aspect-[6/5] w-full"
        >
          <Image
            src="/images/products/hero-products.png"
            alt="Time Aura curated premium products"
            fill
            priority
            className="object-cover rounded-2xl"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
