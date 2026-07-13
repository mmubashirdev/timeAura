"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // NOTE: no newsletter-subscription endpoint exists yet — wire this up
    // to a real backend route when one is added.
    toast.success("Subscribed", {
      description: "You'll now receive our updates and offers.",
    });
    setEmail("");
  };

  return (
    <section className="w-full bg-[#FAFAFA] pb-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#5c0016] rounded-2xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center gap-6 md:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#5c0016]" strokeWidth={1.8} />
            </div>
            <div className="text-white">
              <h3 className="font-serif text-xl lg:text-2xl mb-1">
                Still have questions?
              </h3>
              <p className="text-xs md:text-sm text-white/70 max-w-sm">
                Subscribe to get updates on orders, new arrivals, and exclusive
                offers.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 md:w-72 h-11 px-4 rounded-xl bg-white text-neutral-900 text-sm outline-none focus:ring-2 focus:ring-[#C9A14A]"
              aria-label="Email address"
            />
            <Button
              type="submit"
              className="h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#5c0016] text-sm font-semibold shrink-0"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
