"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: Search,
    title: "Browse",
    desc: "Explore thousands of products across multiple categories.",
  },
  {
    icon: Heart,
    title: "Choose",
    desc: "Compare, read reviews, and choose your favorites.",
  },
  {
    icon: ShoppingBag,
    title: "Order",
    desc: "Place your order securely with multiple payment options.",
  },
  {
    icon: Truck,
    title: "Receive",
    desc: "Enjoy fast delivery right to your doorstep.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#FAFAFA] py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 items-center">
        {/* Left: steps */}
        <div>
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900">
              How It Works
            </h2>
            <div
              className="w-14 h-[3px] bg-[#C9A14A] mx-auto mt-3"
              aria-hidden="true"
            />
          </div>

          <div className="relative grid grid-cols-4 gap-2">
            {/* Dotted connector line */}
            <div
              className="hidden md:block absolute top-7 left-[12%] right-[12%] border-t-2 border-dotted border-[#800020]/30 z-0"
              aria-hidden="true"
            />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#faf1ee] border border-[#f0dcd6] flex items-center justify-center mb-3">
                  <step.icon
                    className="w-6 h-6 text-[#800020]"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed px-1">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: curated shot + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#faf5f2] rounded-2xl overflow-hidden"
        >
          <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full grid grid-cols-[3fr_2fr] items-center">
            <div className="relative h-full">
              <Image
                src="/images/time-products/perfume1.jpg"
                alt="Curated Time Aura products"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="p-6 lg:p-8">
              <h3 className="font-serif text-xl lg:text-2xl text-neutral-900 leading-tight mb-2">
                Curated. Trusted.
                <br />
                Loved by You.
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Our goal is simple — to bring you the best products from trusted
                brands, all in one seamless shopping experience.
              </p>
              <Button className="h-10 px-5 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white text-xs font-semibold gap-2">
                Shop Now <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
