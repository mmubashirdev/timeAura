"use client";

import { motion } from "framer-motion";
import { ArrowRight, Watch, Wallet, SprayCan } from "lucide-react";

const CATEGORIES = [
  {
    key: "wallet",
    icon: Wallet,
    title: "Wallets",
    desc: "Premium wallets",
  },
  {
    key: "watch",
    icon: Watch,
    title: "Watches",
    desc: "Discover watches for every style and occasion.",
  },
  {
    key: "perfume",
    icon: SprayCan,
    title: "Perfumes",
    desc: "Scents that leave a lasting impression.",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="w-full bg-[#FAFAFA] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-3">
            BROWSE CATEGORIES
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-neutral-900">
            Shop by Category
          </h2>
          <div
            className="w-14 h-[3px] bg-[#C9A14A] mx-auto mt-4"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.article
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-neutral-100"
            >
              {/* This box is the LANDING SLOT for the flying product.
                  GSAP.Flip uses data-slot to find it. */}
              <div
                data-slot={cat.key}
                id={`slot-${cat.key}`}
                className="relative h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center overflow-hidden"
              >
                <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center z-10">
                  <cat.icon
                    className="w-5 h-5 text-[#800020]"
                    strokeWidth={1.8}
                  />
                </span>
                {/* The image will fly INTO this container on scroll.
                    Empty by default. */}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-neutral-900 mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                  {cat.desc}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-[#800020] font-semibold hover:gap-3 transition-all"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
