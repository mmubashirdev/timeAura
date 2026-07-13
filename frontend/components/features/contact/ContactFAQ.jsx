"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive a tracking number by email that you can use to follow its progress in real time.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery typically takes 3-7 business days depending on your location.",
  },
  {
    q: "What is your return policy?",
    a: "Products may be returned within 7 days of delivery, provided they are unused and in original packaging.",
  },
  {
    q: "How can I contact customer support?",
    a: "You can reach us via phone, email, live chat, or the contact form on this page — we reply within 24 hours.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we offer free worldwide shipping on all orders.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes, gift wrapping is available at checkout for a small additional fee.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i));

  return (
    <section className="w-full bg-[#FAFAFA] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900">
            Frequently Asked Questions
          </h2>
          <div
            className="w-14 h-[3px] bg-[#C9A14A] mx-auto mt-3"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="bg-white rounded-xl border border-neutral-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-neutral-800">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus
                      className="w-4 h-4 text-[#800020] shrink-0"
                      strokeWidth={2}
                    />
                  ) : (
                    <Plus
                      className="w-4 h-4 text-[#800020] shrink-0"
                      strokeWidth={2}
                    />
                  )}
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
