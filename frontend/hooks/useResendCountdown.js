"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Countdown timer for "Resend code" buttons.
 * @param {number} seconds initial cooldown after triggering (default 60)
 */
export function useResendCountdown(seconds = 60) {
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [remaining]);

  const canResend = remaining === 0;
  const formatted =
    String(Math.floor(remaining / 60)).padStart(2, "0") +
    ":" +
    String(remaining % 60).padStart(2, "0");

  return { start, canResend, remaining, formatted };
}
