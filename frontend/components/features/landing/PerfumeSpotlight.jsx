"use client";

import Image from "next/image";
import { Droplets, Sparkles, Gem } from "lucide-react";

export default function PerfumeSpotlight() {
  return (
    <section
      id="perfume-spotlight"
      className="relative bg-gradient-to-b from-[#efdfd6] to-[#FAFAFA]"
    >
      {/* Scroll distance for the sequence — taller = slower/longer animation */}
      <div className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <p className="absolute top-10 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-[#800020] font-semibold">
            SIGNATURE FRAGRANCE
          </p>

          {/* The perfume itself */}
          <div
            id="spotlight-perfume"
            className="relative w-[200px] sm:w-[260px] aspect-[2/3]"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/images/products/perfume.png"
              alt="Time Aura Oud Prestige perfume"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="260px"
            />

            {/* Spray mist */}
            <div
              id="perfume-mist"
              className="absolute left-1/2 -top-6 -translate-x-1/2 w-36 h-36 sm:w-44 sm:h-44 rounded-full opacity-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(1px)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Feature callouts — DOM order matters, animator targets them by index */}
          <div className="perfume-feature absolute left-[4%] sm:left-[12%] top-[24%] opacity-0 translate-y-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg">
            <span className="w-7 h-7 rounded-full bg-[#800020]/10 flex items-center justify-center shrink-0">
              <Droplets
                className="w-3.5 h-3.5 text-[#800020]"
                strokeWidth={2}
              />
            </span>
            <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
              Long-Lasting Scent
            </span>
          </div>

          <div className="perfume-feature absolute right-[4%] sm:right-[12%] top-[42%] opacity-0 translate-y-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg">
            <span className="w-7 h-7 rounded-full bg-[#800020]/10 flex items-center justify-center shrink-0">
              <Sparkles
                className="w-3.5 h-3.5 text-[#800020]"
                strokeWidth={2}
              />
            </span>
            <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
              Premium Oud Blend
            </span>
          </div>

          <div className="perfume-feature absolute left-[6%] sm:left-[14%] bottom-[20%] opacity-0 translate-y-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg">
            <span className="w-7 h-7 rounded-full bg-[#800020]/10 flex items-center justify-center shrink-0">
              <Gem className="w-3.5 h-3.5 text-[#800020]" strokeWidth={2} />
            </span>
            <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
              Elegant Glass Bottle
            </span>
          </div>

          <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
