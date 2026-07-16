"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { formatPKR } from "@/lib/format";
import { useCart } from "@/hooks/useCart";

export default function RecommendedProducts({ products = [] }) {
  const scrollerRef = useRef(null);
  const { add } = useCart();

  if (products.length === 0) return null;

  const scroll = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="mt-14 relative">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#800020] font-semibold mb-1">
            RECOMMENDED FOR YOU
          </p>
          <h2 className="font-serif text-3xl text-neutral-900">
            Complete Your Collection
          </h2>
        </div>
        <Link
          href="/collections"
          className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-[#800020] hover:text-[#5c0016] transition-colors"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative">
        <ScrollButton dir="left" onClick={() => scroll(-1)} />

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-2 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-56 bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${p.slug}`} className="block">
                <div className="relative aspect-square bg-neutral-50">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-5"
                    sizes="220px"
                  />
                </div>
              </Link>
              <div className="p-3">
                <div className="text-[9px] tracking-[0.2em] text-neutral-500 font-semibold uppercase">
                  {p.categoryLabel || p.category}
                </div>
                <Link href={`/products/${p.slug}`}>
                  <h3 className="text-sm font-semibold text-neutral-900 mt-1 truncate hover:text-[#800020] transition-colors">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-[#800020]">
                    {formatPKR(p.price)}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      add(p, 1);
                      toast.success(`${p.name} added to cart`);
                    }}
                    aria-label={`Add ${p.name} to cart`}
                    className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-[#800020] text-white text-[11px] font-semibold hover:bg-[#5c0016] transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollButton dir="right" onClick={() => scroll(1)} />
      </div>
    </section>
  );
}

function ScrollButton({ dir, onClick }) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow items-center justify-center hover:border-[#800020] hover:text-[#800020] z-10 transition-colors ${
        dir === "left" ? "-left-3" : "-right-3"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
