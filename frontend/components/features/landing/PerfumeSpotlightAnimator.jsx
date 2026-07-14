"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PerfumeSpotlightAnimator() {
  useLayoutEffect(() => {
    // Respect reduced-motion preference — just show the static section, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wrap = document.getElementById("perfume-spotlight");
      const perfume = document.getElementById("spotlight-perfume");
      const mist = document.getElementById("perfume-mist");
      const labels = gsap.utils.toArray(".perfume-feature");
      if (!wrap || !perfume) return;

      // sticky handles the "staying in view" part — GSAP only drives the
      // timeline values, tied to scroll progress through the 300vh wrapper.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        perfume,
        { rotateZ: -6, y: 40, scale: 0.85 },
        { rotateZ: 8, y: 0, scale: 1, duration: 1, ease: "none" },
      )
        .to(labels[0], { opacity: 1, y: 0, duration: 0.6, ease: "none" }, 0.6)
        .to(
          mist,
          { opacity: 0.9, scale: 1.5, y: -30, duration: 0.5, ease: "none" },
          0.7,
        )
        .to(mist, { opacity: 0, duration: 0.4, ease: "none" }, 1.1)
        .to(perfume, { rotateZ: -10, duration: 1, ease: "none" }, 1.2)
        .to(labels[1], { opacity: 1, y: 0, duration: 0.6, ease: "none" }, 1.2)
        .to(labels[2], { opacity: 1, y: 0, duration: 0.6, ease: "none" }, 1.9)
        .to(labels, { opacity: 0, y: -10, duration: 0.5, ease: "none" }, 2.4)
        .to(
          perfume,
          { scale: 0.5, y: 60, opacity: 0.25, duration: 0.8, ease: "none" },
          2.4,
        );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
