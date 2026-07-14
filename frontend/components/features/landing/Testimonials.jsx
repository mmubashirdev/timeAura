"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    text: "The craftsmanship and quality are beyond exceptional. Time Aura is now my go-to brand!",
    name: "Ahmed ",
    avatar: "/images/products/review-avatar-1.jpg",
  },
  {
    text: "Absolutely love the wallet I bought. Elegant, durable and worth every penny.",
    name: "Sarah ",
    avatar: "/images/products/review-avatar-2.jpg",
  },
  {
    text: "The perfumes are long-lasting and premium. I get compliments every time!",
    name: "Abdullah",
    avatar: "/images/products/review-avatar-3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.3em] text-[#800020] font-semibold mb-3">
            WHAT OUR CUSTOMERS SAY
          </p>
          <h2 className="font-serif text-4xl text-neutral-900">
            Trusted by Thousands
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full border border-[#800020]/30 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors shrink-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {REVIEWS.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <div className="flex gap-0.5 text-[#C9A14A] mb-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-[#C9A14A]" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      {r.name}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Verified Buyer
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <button
            className="w-10 h-10 rounded-full border border-[#800020]/30 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors shrink-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
