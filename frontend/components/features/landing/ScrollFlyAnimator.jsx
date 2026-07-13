"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Runs safely on client only
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PRODUCTS = ["watch", "wallet", "perfume"];

export default function ScrollFlyAnimator() {
  useIso(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const ctx = gsap.context(() => {
      // For each product, build a scroll-scrubbed animation that moves it
      // from its current position (hero) to the category slot's position.
      PRODUCTS.forEach((key) => {
        const el = document.getElementById(`fly-${key}`);
        const slot = document.getElementById(`slot-${key}`);
        if (!el || !slot) return;

        // Capture starting state
        const startRect = el.getBoundingClientRect();
        const startScroll = window.scrollY;

        ScrollTrigger.create({
          trigger: "#categories",
          start: "top bottom", // when categories section enters viewport
          end: "top center", // finishes when it hits the center of viewport
          scrub: 1, // tie animation to scroll (1s lag = smooth)
          onUpdate: (self) => {
            const slotRect = slot.getBoundingClientRect();
            const heroEl = document.getElementById(`fly-${key}`);
            if (!heroEl) return;

            // Recompute the START rect on each frame because the hero also
            // scrolls. We use the element's ORIGINAL screen position at scroll=0
            // as our starting reference and interpolate toward the slot's
            // CURRENT position.
            const parentRect = heroEl.parentElement.getBoundingClientRect();

            // Progress goes 0 → 1
            const p = self.progress;

            // Target size = ~85% of slot dimensions (padding inside card)
            const targetW = slotRect.width * 0.85;
            const targetH = slotRect.height * 0.85;

            // Original hero-relative offsets
            const originalW = startRect.width;
            const originalH = startRect.height;

            const currentW = gsap.utils.interpolate(originalW, targetW, p);
            const currentH = gsap.utils.interpolate(originalH, targetH, p);

            // Position relative to viewport, then convert to fixed positioning
            const originX = startRect.left;
            const originY = startRect.top + (window.scrollY - startScroll);
            const targetX = slotRect.left + (slotRect.width - targetW) / 2;
            const targetY = slotRect.top + (slotRect.height - targetH) / 2;

            const currentX = gsap.utils.interpolate(originX, targetX, p);
            const currentY = gsap.utils.interpolate(originY, targetY, p);

            gsap.set(heroEl, {
              position: "fixed",
              left: currentX,
              top: currentY,
              width: currentW,
              height: currentH,
              zIndex: 40,
              rotate: gsap.utils.interpolate(
                0,
                key === "watch" ? -8 : key === "wallet" ? 6 : -4,
                p,
              ),
            });
          },
          onLeaveBack: () => {
            // Fully back in hero — restore original inline styles
            const heroEl = document.getElementById(`fly-${key}`);
            if (heroEl) {
              gsap.set(heroEl, { clearProps: "all" });
            }
          },
        });
      });

      // Refresh once fonts/images have settled
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
