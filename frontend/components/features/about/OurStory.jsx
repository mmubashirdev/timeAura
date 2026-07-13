"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To connect customers with authentic lifestyle products from trusted brands while providing a seamless, secure, and enjoyable shopping experience.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become the most trusted marketplace for premium lifestyle products, loved by millions of customers worldwide.",
  },
];

export default function OurStory() {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr_1fr_1fr] gap-6 items-stretch">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square lg:aspect-auto lg:h-full rounded-2xl overflow-hidden"
        >
          <Image
            src="/images/products/our-story.jpg"
            alt="Customer unboxing a Time Aura package"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
        </motion.div>

        {/* Story text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-3">
            OUR STORY
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl leading-tight text-neutral-900 mb-4">
            Why We Created Time Aura
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Shopping for premium products should be easy, reliable, and
            enjoyable. We built Time Aura to bring the best of global brands and
            trusted sellers together in one place. Our mission is to make
            quality lifestyle shopping simple, transparent, and accessible for
            everyone.
          </p>
        </motion.div>

        {/* Mission + Vision cards */}
        {PILLARS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="bg-[#faf1ee] rounded-2xl p-6 flex flex-col"
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
              <p.icon className="w-5 h-5 text-[#800020]" strokeWidth={1.8} />
            </div>
            <h3 className="font-serif text-xl text-neutral-900 mb-3">
              {p.title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
