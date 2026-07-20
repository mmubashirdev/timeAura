"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { formatPKR } from "@/lib/format";
import { useCart } from "@/hooks/useCart";

export default function RelatedProducts({ products = [] }) {
  const scrollerRef = useRef(null);
  const { add } = useCart();

  if (products.length === 0) return null;

  const scroll = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="my-14 relative">
      <p className="text-center text-[10px] tracking-[0.3em] text-[#800020] font-semibold mb-2">
        YOU MAY ALSO LIKE
      </p>
      <h2 className="text-center font-serif text-3xl md:text-4xl mb-8 text-neutral-900">
        Related Products
      </h2>

      <button
        onClick={() => scroll(-1)}
        className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow flex items-center justify-center hover:border-[#800020] z-10 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4 text-[#800020]" />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-10 md:px-12 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-52 bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${p.slug}`} className="block">
              <div className="relative aspect-square bg-neutral-50">
                <Image
                  src={p.thumbnailImage || p.image || "/images/products/placeholder.png"}
                  alt={p.name}
                  fill
                  className="object-contain p-5"
                  sizes="200px"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-neutral-900 truncate">
                  {p.name}
                </h3>
                <p className="text-[#800020] font-bold text-sm mt-1">
                  {formatPKR(p.price)}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-[#C9A14A] fill-[#C9A14A]" />
                    <span className="font-medium">{p.rating ?? 4.7}</span>
                    <span className="text-neutral-400">
                      ({p.reviewCount ?? 18})
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      add(p, 1);
                      toast.success(`${p.name} added to cart`);
                    }}
                    aria-label="Add to cart"
                    className="w-7 h-7 bg-[#800020] text-white rounded-md flex items-center justify-center hover:bg-[#5c0016] transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow flex items-center justify-center hover:border-[#800020] z-10 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 text-[#800020]" />
      </button>
    </section>
  );
}
