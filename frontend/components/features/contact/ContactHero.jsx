"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Headphones, UserCheck } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="w-full bg-[#faf5f2]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-4">
            CONTACT US
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-neutral-900 mb-4">
            We&apos;re Here to <span className="text-[#800020]">Help</span> You
          </h1>
          <div className="w-14 h-[3px] bg-[#C9A14A] mb-5" aria-hidden="true" />
          <p className="text-neutral-600 text-base leading-relaxed max-w-md mb-8">
            Have a question, need assistance, or want to share feedback? Our
            team is ready to help you. Get in touch with us anytime.
          </p>

          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f0dcd6] flex items-center justify-center shrink-0">
                <Headphones
                  className="w-5 h-5 text-[#800020]"
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-900">
                  Fast Response
                </div>
                <div className="text-xs text-neutral-500">
                  We reply within 24 hours
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f0dcd6] flex items-center justify-center shrink-0">
                <UserCheck
                  className="w-5 h-5 text-[#800020]"
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-900">
                  Customer First
                </div>
                <div className="text-xs text-neutral-500">
                  Your satisfaction is our priority
                </div>
              </div>
            </div>
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
            alt="Time Aura premium watches, wallets, and perfumes"
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
