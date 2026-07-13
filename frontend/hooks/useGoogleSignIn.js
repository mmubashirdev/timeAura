"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/**
 * Wraps Google Identity Services in a hook.
 * Returns `signIn()` which resolves with { idToken } when the user completes
 * the Google flow, or rejects if they close the popup / an error occurs.
 */
export function useGoogleSignIn() {
  const [ready, setReady] = useState(false);
  const resolverRef = useRef(null);

  // Wait for the GIS script (loaded in layout.js) to attach itself to window
  useEffect(() => {
    if (!CLIENT_ID) return;

    let cancelled = false;
    const check = () => {
      if (cancelled) return;
      if (typeof window !== "undefined" && window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => {
            if (resolverRef.current) {
              if (response?.credential) {
                resolverRef.current.resolve({ idToken: response.credential });
              } else {
                resolverRef.current.reject(
                  new Error("Google did not return a credential"),
                );
              }
              resolverRef.current = null;
            }
          },
        });
        setReady(true);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(() => {
    if (!CLIENT_ID) {
      return Promise.reject(
        new Error(
          "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID. Add it to .env.local.",
        ),
      );
    }
    if (!ready || !window.google?.accounts?.id) {
      return Promise.reject(new Error("Google sign-in is not ready yet."));
    }

    return new Promise((resolve, reject) => {
      resolverRef.current = { resolve, reject };

      // Show Google's One Tap / popup prompt
      window.google.accounts.id.prompt((notification) => {
        // If the prompt was skipped/dismissed and we still have a pending
        // resolver, reject so the calling code can handle it.
        if (
          notification.isNotDisplayed?.() ||
          notification.isSkippedMoment?.() ||
          notification.isDismissedMoment?.()
        ) {
          if (resolverRef.current) {
            resolverRef.current.reject(
              new Error("Sign-in was cancelled or blocked."),
            );
            resolverRef.current = null;
          }
        }
      });
    });
  }, [ready]);

  return { signIn, ready, configured: Boolean(CLIENT_ID) };
}
