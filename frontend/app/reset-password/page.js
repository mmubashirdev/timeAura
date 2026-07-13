"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import AuthLayout from "@/components/features/auth/AuthLayout";

import { resetCodeSchema } from "@/lib/validations";
import { useForgotPassword } from "@/hooks/useAuth";
import { useResendCountdown } from "@/hooks/useResendCountdown";

function ResetPasswordStepOne() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const forgotMutation = useForgotPassword();
  const { start, canResend, formatted } = useResendCountdown(60);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetCodeSchema),
    mode: "onSubmit",
    defaultValues: { code: "" },
  });

  // Guard: no email in URL → send them back to request a code
  useEffect(() => {
    if (!email) {
      toast.error("Missing email", {
        description: "Please request a reset code first.",
      });
      router.replace("/forgot-password");
      return;
    }
    // Kick off the initial 60s cooldown — user just received the email
    start();
  }, [email, router, start]);

  const onSubmit = (values) => {
    // No API call here — code is validated in step 2 as part of the atomic
    // /auth/reset-password call. We just hand both values to step 2.
    const params = new URLSearchParams({ email, code: values.code });
    router.push(`/reset-password/new?${params.toString()}`);
  };

  const handleResend = () => {
    if (!canResend || forgotMutation.isPending) return;
    // Contract: POST /auth/forgot-password  body: { email }
    forgotMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("Code sent", {
            description: "Check your inbox for a new 6-digit code.",
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col"
      >
        <div className="w-14 h-14 rounded-full bg-[#800020]/10 flex items-center justify-center self-center mb-4">
          <KeyRound className="w-6 h-6 text-[#800020]" strokeWidth={1.8} />
        </div>

        <header className="text-center mb-5">
          <h1 className="font-serif text-2xl xl:text-3xl font-bold text-[#5c0016] tracking-wide uppercase">
            Enter Reset Code
          </h1>
          <div
            className="w-14 h-[3px] bg-[#C9A14A] mt-2 mb-3 mx-auto"
            aria-hidden="true"
          />
          <p className="text-neutral-600 text-sm">
            We&apos;ve sent a 6-digit code to
          </p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 break-all">
            <Mail className="w-4 h-4 text-[#C9A14A]" strokeWidth={1.8} />
            {email}
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* OTP — centered, no email field */}
          <div className="flex flex-col gap-2 items-center">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  aria-label="6-digit reset code"
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
              )}
            />
            {errors.code && (
              <p role="alert" className="text-[11px] text-destructive">
                {errors.code.message}
              </p>
            )}
          </div>

          {/* Resend */}
          <p className="text-xs text-neutral-600 text-center">
            Didn&apos;t receive the code?{" "}
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={forgotMutation.isPending}
                className="text-[#C9A14A] font-semibold hover:underline disabled:opacity-50"
              >
                {forgotMutation.isPending ? "Sending..." : "Resend Code"}
              </button>
            ) : (
              <span className="text-[#C9A14A] font-semibold">
                Resend in {formatted}
              </span>
            )}
          </p>

          <Button
            type="submit"
            className="mt-1 h-11 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.15em] text-xs uppercase shadow-lg shadow-[#5c0016]/20"
          >
            Continue
          </Button>

          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-neutral-600 hover:text-[#800020] transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Use a different email
          </Link>
        </form>
      </motion.div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordStepOne />
    </Suspense>
  );
}
