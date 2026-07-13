"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Lock,
  Truck,
  RefreshCw,
  Headphones,
} from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified Sellers",
    desc: "Every seller is carefully verified for trust and reliability.",
  },
  {
    icon: Award,
    title: "Authentic Products",
    desc: "100% genuine products from trusted brands and sellers.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "Safe and encrypted payments for complete peace of mind.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Reliable and timely delivery to your doorstep.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Hassle-free returns and exchanges made simple.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "We're here to help you, whenever you need us.",
  },
];

export default function Differentiators() {
  return (
    <section className="w-full bg-[#FAFAFA] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900">
            What Makes Time Aura Different?
          </h2>
          <div
            className="w-14 h-[3px] bg-[#C9A14A] mx-auto mt-3"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-3">
                <it.icon className="w-6 h-6 text-[#800020]" strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {it.title}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-[160px]">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
