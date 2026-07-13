"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { ShoppingBag, Store, Sparkles, Users } from "lucide-react";

const STATS = [
  {
    icon: ShoppingBag,
    value: 15000,
    suffix: "+",
    label: "Products",
    format: shortK,
  },
  { icon: Store, value: 500, suffix: "+", label: "Trusted Sellers" },
  { icon: Sparkles, value: 50, suffix: "+", label: "Popular Brands" },
  {
    icon: Users,
    value: 100000,
    suffix: "+",
    label: "Happy Customers",
    format: shortK,
  },
];

function shortK(n) {
  return n >= 1000 ? `${Math.round(n / 1000)}K` : `${Math.round(n)}`;
}

function CountUp({ to, format }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(format ? format(0) : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) =>
        setDisplay(format ? format(v) : Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to, format, mv]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  return (
    <section className="w-full bg-[#FAFAFA] pb-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#faf1ee] rounded-2xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 justify-center md:justify-start"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-[#800020]" strokeWidth={1.8} />
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl text-neutral-900 leading-none">
                  <CountUp to={s.value} format={s.format} />
                  {s.suffix}
                </div>
                <div className="text-xs text-neutral-600 mt-1">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
