"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  {
    id: 1,
    name: "TA Chrono Classic",
    price: 199,
    img: "/images/products/best-1.png",
  },
  {
    id: 2,
    name: "TA Leather Wallet",
    price: 79,
    img: "/images/products/best-2.png",
  },
  {
    id: 3,
    name: "Oud Prestige",
    price: 129,
    img: "/images/products/best-3.png",
  },
  {
    id: 4,
    name: "TA Heritage",
    price: 179,
    img: "/images/products/best-4.png",
  },
  {
    id: 5,
    name: "TA Bifold Wallet",
    price: 69,
    img: "/images/products/best-5.png",
  },
  {
    id: 6,
    name: "Noir Intense",
    price: 119,
    img: "/images/products/best-6.png",
  },
];

export default function BestSellers() {
  return (
    <section id="best-sellers" className="w-full bg-[#FAFAFA] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-3">
            BEST SELLERS
          </p>
          <h2 className="font-serif text-4xl text-neutral-900">
            Trending Products
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-4 border border-neutral-100 hover:shadow-lg transition-shadow group"
            >
              <div className="relative aspect-square mb-3 bg-neutral-50 rounded-xl overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                  sizes="200px"
                />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {p.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-900">
                  ${p.price}.00
                </span>
                <button className="w-8 h-8 rounded-lg border border-[#800020]/20 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="h-12 px-8 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white text-sm font-semibold gap-2">
            View All Products <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
