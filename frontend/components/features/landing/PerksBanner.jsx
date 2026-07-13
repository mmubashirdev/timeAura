"use client";

import { Gift, Zap, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const PERKS = [
  { icon: Gift, title: "Exclusive Offers", desc: "For our members only" },
  { icon: Zap, title: "Early Access", desc: "To new collections" },
  { icon: Tag, title: "Special Discounts", desc: "And much more" },
];

export default function PerksBanner() {
  return (
    <section className="w-full bg-[#5c0016] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.2fr] gap-8 items-center">
        {PERKS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-[#C9A14A] flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-[#C9A14A]" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="text-xs text-white/70">{desc}</p>
            </div>
          </div>
        ))}

        <div>
          <h3 className="font-serif text-xl mb-2">Join the Time Aura Family</h3>
          <p className="text-xs text-white/70 mb-3">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 px-3 rounded-xl bg-white text-neutral-900 text-sm outline-none focus:ring-2 focus:ring-[#C9A14A]"
              aria-label="Email address"
            />
            <Button className="h-10 px-5 rounded-xl bg-[#C9A14A] hover:bg-[#b8912f] text-neutral-900 text-xs font-semibold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
