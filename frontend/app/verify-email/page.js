"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MailCheck, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import AuthLayout from "@/components/features/auth/AuthLayout";
import LoadingSpinner from "@/components/features/auth/LoadingSpinner";

import { useVerifyEmail, useResendVerification } from "@/hooks/useAuth";
import { useResendCountdown } from "@/hooks/useResendCountdown";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendVerification();
  const { start, canResend, formatted } = useResendCountdown(60);

  // Kick off the initial 60s cooldown when the page loads (user just got the email).
  useEffect(() => {
    start();
  }, [start]);

  // Guard: no email in URL → send them back to signup
  useEffect(() => {
    if (!email) {
      toast.error("Missing email", {
        description: "Please sign up again to receive a verification code.",
      });
      router.replace("/signup");
    }
  }, [email, router]);

  const submitCode = (value) => {
    // Contract: POST /auth/verify-email  body: { email, code }
    verifyMutation.mutate(
      { email, code: value },
      {
        onSuccess: () => {
          toast.success("Email verified", {
            description: "You can now sign in.",
          });
          router.push("/login");
        },
        onError: (err) => {
          toast.error("Verification failed", {
            description: err.message || "The code is invalid or expired.",
          });
          setCode(""); // clear so they can try again
        },
      },
    );
  };

  const handleChange = (value) => {
    setCode(value);
    if (value.length === 6 && !verifyMutation.isPending) {
      submitCode(value);
    }
  };

  const handleResend = () => {
    if (!canResend || resendMutation.isPending) return;
    // Contract: POST /auth/resend-verification  body: { email }
    resendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("Code sent", {
            description: "Check your inbox for a new verification code.",
          });
          start();
        },
        onError: (err) => {
          toast.error("Could not resend code", {
            description: err.message || "Please try again shortly.",
          });
        },
      },
    );
  };

  return (
    <AuthLayout>
      {/* Back link */}
      <div className="flex justify-end mb-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-[#800020] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#C9A14A]/15 flex items-center justify-center mb-4">
          <MailCheck className="w-7 h-7 text-[#C9A14A]" strokeWidth={1.8} />
        </div>

        <h1 className="font-serif text-2xl xl:text-3xl font-bold text-[#5c0016] tracking-wide mb-2">
          Verify Your Email
        </h1>

        <p className="text-sm text-neutral-600 mb-1">
          We&apos;ve sent a 6-digit code to
        </p>
        <p className="text-sm font-semibold text-neutral-900 mb-6 break-all">
          {email}
        </p>

        {/* OTP input */}
        <div className="mb-3">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={handleChange}
            disabled={verifyMutation.isPending}
            aria-label="6-digit verification code"
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-11 h-12 text-lg font-semibold rounded-lg border border-neutral-200 bg-white"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Resend */}
        <p className="text-xs text-neutral-600 mb-5">
          Didn&apos;t receive the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="text-[#C9A14A] font-semibold hover:underline disabled:opacity-50"
            >
              {resendMutation.isPending ? "Sending..." : "Resend Code"}
            </button>
          ) : (
            <span className="text-[#C9A14A] font-semibold">
              Resend in {formatted}
            </span>
          )}
        </p>

        {/* Submit */}
        <Button
          type="button"
          disabled={code.length !== 6 || verifyMutation.isPending}
          onClick={() => submitCode(code)}
          className="w-full h-11 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.15em] text-xs uppercase shadow-lg shadow-[#5c0016]/20"
        >
          {verifyMutation.isPending ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner /> Verifying...
            </span>
          ) : (
            "Verify & Continue"
          )}
        </Button>

        <p className="text-[11px] text-neutral-500 mt-4 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-neutral-400" />
          Your information is secure with us
        </p>
      </motion.div>
    </AuthLayout>
  );
}

// useSearchParams must be wrapped in Suspense in Next.js App Router
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
