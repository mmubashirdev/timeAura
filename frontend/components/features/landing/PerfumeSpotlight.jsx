"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Droplets, Sparkles, Gem } from "lucide-react";

export default function PerfumeSpotlight() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const perfumeRef = useRef(null);
  const mistRef = useRef(null);
  const label1Ref = useRef(null);
  const label2Ref = useRef(null);
  const label3Ref = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500", // ← tune this: bigger number = slower/longer scroll sequence
          scrub: 1,
          pin: pinRef.current, // GSAP handles the pinning itself — no CSS sticky needed
          pinSpacing: true,
          // markers: true, // uncomment while tuning locally, remove before deploying
        },
      });

      tl.fromTo(
        perfumeRef.current,
        { rotateZ: -6, y: 40, scale: 0.85 },
        { rotateZ: 8, y: 0, scale: 1, duration: 1, ease: "none" },
      )
        .to(
          label1Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "none" },
          0.6,
        )
        .to(
          mistRef.current,
          { opacity: 0.9, scale: 1.5, y: -30, duration: 0.5, ease: "none" },
          0.7,
        )
        .to(mistRef.current, { opacity: 0, duration: 0.4, ease: "none" }, 1.1)
        .to(
          perfumeRef.current,
          { rotateZ: -10, duration: 1, ease: "none" },
          1.2,
        )
        .to(
          label2Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "none" },
          1.2,
        )
        .to(
          label3Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "none" },
          1.9,
        )
        .to(
          [label1Ref.current, label2Ref.current, label3Ref.current],
          { opacity: 0, y: -10, duration: 0.5, ease: "none" },
          2.4,
        )
        .to(
          perfumeRef.current,
          { scale: 0.5, y: 60, opacity: 0.25, duration: 0.8, ease: "none" },
          2.4,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#efdfd6] to-[#FAFAFA]"
    >
      <div
        ref={pinRef}
        className="h-screen flex items-center justify-center overflow-hidden relative"
      >
        <p className="absolute top-10 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-[#800020] font-semibold">
          SIGNATURE FRAGRANCE
        </p>

        <div
          ref={perfumeRef}
          className="relative w-[200px] sm:w-[260px] aspect-[2/3]"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/products/perfume.png"
            alt="Time Aura Oud Prestige perfume"
            fill
            priority
            className="object-contain drop-shadow-2xl"
            sizes="260px"
          />

          <div
            ref={mistRef}
            className="absolute left-1/2 -top-6 -translate-x-1/2 w-36 h-36 sm:w-44 sm:h-44 rounded-full opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
              filter: "blur(1px)",
            }}
            aria-hidden="true"
          />
        </div>

        <div
          ref={label1Ref}
          className="absolute left-[4%] sm:left-[12%] top-[24%] opacity-0 translate-y-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg"
        >
          <span className="w-7 h-7 rounded-full bg-[#800020]/10 flex items-center justify-center shrink-0">
            <Droplets className="w-3.5 h-3.5 text-[#800020]" strokeWidth={2} />
          </span>
          <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
            Long-Lasting Scent
          </span>
        </div>

        <div
          ref={label2Ref}
          className="absolute right-[4%] sm:right-[12%] top-[42%] opacity-0 translate-y-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg"
        >
          <span className="w-7 h-7 rounded-full bg-[#800020]/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#800020]" strokeWidth={2} />
          </span>
          <span className="text-xs font-semibold text-neutral-800 whitespace-nowrap">
            Premium Oud Blend
          </span>
        </div>

        <div
          ref={label3Ref}
          className="absolute left-[6%] sm:left-[14%] bottom-[20%] opacity-0 translate-y-4 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg"
        >
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
    </section>
  );
}
