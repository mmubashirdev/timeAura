"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ITEMS = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+923000000000", "Mon - Fri: 9:00 AM - 6:00 PM (EST)"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["timeaura-online@gmail.com", "We respond within 24 hours"],
  },
  {
    icon: MapPin,
    title: "Address",
    lines: ["Lahore garrison University,", ",Pakistan"],
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    lines: ["Available on our website", "Mon - Fri: 9:00 AM - 6:00 PM (EST)"],
  },
];

export default function ContactInfoCards() {
  return (
    <section className="w-full bg-[#FAFAFA] py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-full bg-[#5c0016] flex items-center justify-center shrink-0">
              <it.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {it.title}
              </h3>
              {it.lines.map((line) => (
                <p
                  key={line}
                  className="text-xs text-neutral-500 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
