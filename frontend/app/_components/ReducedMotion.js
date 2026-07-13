"use client";

export function ReducedMotion({ children }) {
  // lightweight client-side hook to respect user preference
  return <div className="reduced-motion">{children}</div>;
}
