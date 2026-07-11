"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../validations/resetPassword.schema";
import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPasswordForm() {
  const mutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    mutation.mutate(values);
  };

  const hasEmailError = Boolean(errors.email);

  const inputBase =
    "h-12 w-full rounded-xl border bg-white/70 px-4 pl-11 text-sm text-aura-black outline-none transition-all placeholder:text-aura-grayText/70 focus:ring-2";

  return (
    <div className="flex min-h-full w-full max-w-lg flex-col justify-center px-7 py-8 sm:px-10 lg:px-12">
      <div className="w-full">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-aura-maroonDeep/10 bg-aura-maroonDeep/10">
              <Lock
                className="h-6 w-6 text-aura-maroonDeep"
                strokeWidth={2}
              />
            </div>
          </div>

          <h1 className="font-anton text-[30px] leading-none tracking-[0.04em] text-aura-maroonDeep sm:text-[38px]">
            RESET YOUR PASSWORD
          </h1>

          {/* Decorative amber divider */}
          <div className="my-3 flex items-center justify-center gap-2">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-aura-amber/80" />
            <span className="text-sm text-aura-amber">✦</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-aura-amber/80" />
          </div>

          <p className="mx-auto min-h-10 max-w-sm text-sm leading-relaxed text-aura-grayText">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6" noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-aura-black"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-aura-grayText" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                aria-invalid={hasEmailError}
                aria-describedby={
                  hasEmailError ? "email-error" : "reset-password-feedback"
                }
                className={`${inputBase} ${
                  hasEmailError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-aura-amber focus:ring-aura-amber/30"
                }`}
                {...register("email", {
                  onChange: () => {
                    // Remove an old success/error message when user changes email.
                    if (mutation.isSuccess || mutation.isError) {
                      mutation.reset();
                    }
                  },
                })}
              />
            </div>

            {/* Validation error — directly under the input */}
            {errors.email?.message && (
              <p
                id="email-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium leading-4 text-red-600 animate-in fade-in slide-in-from-top-1"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/*
            Fixed feedback area for API responses only.
            Keeps a consistent height so the button doesn't jump around.
          */}
          <div
            id="reset-password-feedback"
            aria-live="polite"
            aria-atomic="true"
            className="mt-1 h-11"
          >
            {/* API error */}
            {mutation.isError && (
              <div
                role="alert"
                className="flex h-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p className="text-[11px] leading-4">
                  We couldn&apos;t send the reset link. Please try again.
                </p>
              </div>
            )}

            {/* API success */}
            {mutation.isSuccess && (
              <div
                role="status"
                className="flex h-full items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 text-green-700"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <p className="text-[11px] leading-4">
                  If that email is registered, a reset link has been sent.
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-aura-maroonDeep text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-aura-maroon hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-amber focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-aura-grayText">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white/80 text-sm font-semibold uppercase tracking-wider text-aura-black transition-all duration-200 hover:-translate-y-0.5 hover:border-aura-gold/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-amber focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.6l6.2 5.2c-.4.4 6.5-4.8 6.5-14.8 0-1.2-.1-2.3-.4-3.5z"
              />
            </svg>

            Continue with Google
          </button>

          {/* Back link */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-[13px] font-medium text-aura-maroonDeep transition-colors hover:text-aura-amber hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}