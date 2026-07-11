"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validations/register.schema";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const mutation = useRegister();

  const onSubmit = (values: RegisterFormValues) => {
    mutation.mutate({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
  };

  const inputBase =
    "h-10 rounded-xl border border-gray-200 bg-aura-creamCard px-4 pl-10 w-full text-sm text-aura-black placeholder:text-aura-grayText/70 outline-none transition-colors focus:border-aura-amber focus:ring-2 focus:ring-aura-amber/30";

  return (
    <div className="flex h-full w-full max-w-md flex-col justify-center px-8 py-5 sm:px-10">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="font-cinzel text-[22px] font-bold uppercase tracking-wide text-aura-maroonDeep sm:text-2xl">
          Create{" "}
          <span className="relative inline-block">
            Your
            {/* Amber underline positioned under "Your" */}
            <span className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded bg-aura-amber" />
          </span>{" "}
          Account
        </h2>
        <p className="mt-4 text-sm text-aura-grayText">
          Join Time Aura and experience timeless elegance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-aura-black"
          >
            Full Name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aura-grayText" />
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              aria-invalid={!!errors.fullName}
              className={inputBase}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="mt-0.5 text-[11px] text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-aura-black"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aura-grayText" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              aria-invalid={!!errors.email}
              className={inputBase}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-0.5 text-[11px] text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-aura-black"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aura-grayText" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              aria-invalid={!!errors.password}
              className={`${inputBase} pr-10`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-aura-grayText transition-colors hover:text-aura-maroonDeep"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-0.5 text-[11px] text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-aura-black"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aura-grayText" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              aria-invalid={!!errors.confirmPassword}
              className={`${inputBase} pr-10`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-aura-grayText transition-colors hover:text-aura-maroonDeep"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-0.5 text-[11px] text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="pt-0.5">
          <label className="flex items-center gap-2 text-[13px] text-aura-black">
            <input
              type="checkbox"
              className="h-4 w-4 shrink-0 accent-aura-maroonDeep"
              {...register("agreeToTerms")}
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-aura-amber hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-aura-amber hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-0.5 text-[11px] text-red-600">
              {errors.agreeToTerms.message as string}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-aura-maroonDeep text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-aura-maroon hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-[11px] font-medium tracking-widest text-aura-grayText">
            OR
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold uppercase tracking-wider text-aura-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
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

        {/* Footer */}
        <p className="text-center text-[13px] text-aura-grayText">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-aura-amber hover:underline"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}