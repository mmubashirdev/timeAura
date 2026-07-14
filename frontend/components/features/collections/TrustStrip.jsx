"use client";

import { Truck, ShieldCheck, RefreshCw, Lock } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    title: "Free Shipping Across Pakistan",
    desc: "On all orders",
  },
  { icon: ShieldCheck, title: "2 Year Warranty", desc: "Premium coverage" },
  { icon: RefreshCw, title: "Easy Returns", desc: "Hassle free" },
  { icon: Lock, title: "Secure Payments", desc: "100% safe & secure" },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-[#faf5f2] py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 justify-center md:justify-start"
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-[#800020]" strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 leading-tight">
                {title}
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
