"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const REVIEWS = [
  {
    text: "The selection is amazing and the quality is excellent. Time Aura has become my go-to shopping platform!",
    name: "Ahmed ",
    avatar: "/images/products/review-avatar-1.jpg",
  },
  {
    text: "I love how easy it is to find authentic products from top brands. Fast delivery and great customer support too!",
    name: "Sarah ",
    avatar: "/images/products/review-avatar-2.jpg",
  },
  {
    text: "Great prices, genuine products, and a smooth shopping experience. Highly recommended!",
    name: "Abdullah",
    avatar: "/images/products/review-avatar-3.jpg",
  },
];

export default function AboutTestimonials() {
  return (
    <section className="w-full bg-[#FAFAFA] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#faf5f2] rounded-2xl px-6 py-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-0.5 text-[#C9A14A] mb-2">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="w-3 h-3 fill-[#C9A14A]" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#800020]">
                      {r.name}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                      <BadgeCheck
                        className="w-3.5 h-3.5 text-[#C9A14A]"
                        strokeWidth={1.8}
                      />
                      Verified Buyer
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
