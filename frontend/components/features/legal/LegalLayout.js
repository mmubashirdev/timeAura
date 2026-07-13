"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Watch } from "lucide-react";

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#FAFAFA]/90 backdrop-blur border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Time Aura home"
          >
            <div className="w-9 h-9 rounded-full border-2 border-[#800020] flex items-center justify-center group-hover:bg-[#800020]/5 transition-colors">
              <Watch className="w-4 h-4 text-[#800020]" strokeWidth={1.8} />
            </div>
            <span className="font-serif text-lg font-bold tracking-[0.15em] text-[#5c0016]">
              TIME AURA
            </span>
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-[#800020] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-6 py-12 lg:py-16"
      >
        <header className="mb-10">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#5c0016] tracking-wide uppercase">
            {title}
          </h1>
          <div className="w-14 h-[3px] bg-[#C9A14A] mt-4" aria-hidden="true" />
          {lastUpdated && (
            <p className="mt-4 text-sm text-neutral-500">
              Last updated:{" "}
              <time dateTime={lastUpdated}>
                {new Date(lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          )}
        </header>

        <div className="legal-prose space-y-8 text-[15px] leading-7 text-neutral-700">
          {children}
        </div>

        <footer className="mt-16 pt-8 border-t border-neutral-200 text-sm text-neutral-500">
          <p>
            Questions? Contact us at{" "}
            <a
              href="mailto:timeaura.online@gmail.com"
              className="text-[#C9A14A] font-medium hover:underline"
            >
              timeaura.online@gmail.com
            </a>
          </p>
        </footer>
      </motion.article>
    </div>
  );
}
