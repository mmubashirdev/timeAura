"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    text: "The craftsmanship and quality are beyond exceptional. Time Aura is now my go-to brand!",
    name: "Ahmed",
    avatar: "/images/products/review-avatar-1.jpg",
  },
  {
    text: "Absolutely love the wallet I bought. Elegant, durable and worth every penny.",
    name: "Sarah",
    avatar: "/images/products/review-avatar-2.jpg",
  },
  {
    text: "The perfumes are long-lasting and premium. I get compliments every time!",
    name: "Abdullah",
    avatar: "/images/products/review-avatar-3.jpg",
  },
  {
    text: "Bought a watch for my husband's anniversary. The packaging and details are stunning.",
    name: "Fatima",
    avatar: "/images/products/review-avatar-2.jpg",
  },
  {
    text: "Incredible value. It feels like I'm wearing a luxury timepiece that costs 10x more.",
    name: "Zain",
    avatar: "/images/products/review-avatar-1.jpg",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      // If at the beginning, don't scroll left
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // If we reached the end, loop back to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      scrollRight();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

        {/* Layout: Arrows on extreme left and right, cards in the middle */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-[#800020]/30 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors shrink-0 z-10 bg-neutral-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Carousel Track */}
          <div 
            ref={scrollRef}
            className="flex-1 flex overflow-x-hidden gap-6 scroll-smooth snap-x snap-mandatory py-4"
          >
            {REVIEWS.map((r, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shrink-0 w-full md:w-[calc(33.333%-1rem)] snap-start shadow-sm border border-neutral-100 flex flex-col"
              >
                <div className="flex gap-0.5 text-[#C9A14A] mb-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-[#C9A14A]" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed mb-6 flex-1">
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
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-[#800020]/30 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors shrink-0 z-10 bg-neutral-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
