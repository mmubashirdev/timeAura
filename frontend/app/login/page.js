"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/features/auth/AuthLayout";
import FormField from "@/components/features/auth/FormField";
import PasswordInput from "@/components/features/auth/PasswordInput";
import GoogleButton from "@/components/features/auth/GoogleButton";
import AuthDivider from "@/components/features/auth/AuthDivider";
import LoadingSpinner from "@/components/features/auth/LoadingSpinner";

import { loginSchema } from "@/lib/validations";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Contract: POST /auth/login  body: { email, password }
      const res = await authApi.login({
        email: values.email,
        password: values.password,
      });

      // Backend returns { data: { user, accessToken } } and sets refreshToken cookie
      if (res?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }

      toast.success("Welcome back", {
        description: "You're signed in.",
      });
      router.push("/");
    } catch (err) {
      toast.error("Sign in failed", {
        description:
          err.message || "Please check your credentials and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      {/* Heading */}
      <header className="mb-8">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-[#5c0016] tracking-wide uppercase">
          Welcome Back
        </h1>
        <div
          className="w-14 h-[3px] bg-[#C9A14A] mt-3 mb-4"
          aria-hidden="true"
        />
        <p className="text-neutral-600 text-[15px]">
          Sign in to continue your Time Aura experience.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <FormField
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#C9A14A] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-neutral-400 z-10 pointer-events-none"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="h-[46px] pl-10 rounded-2xl"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p
              id="password-error"
              role="alert"
              className="text-xs text-destructive pl-1"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="mt-2 h-[48px] rounded-2xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.15em] text-sm uppercase shadow-lg shadow-[#5c0016]/20"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner /> Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>

        <AuthDivider />

        <GoogleButton />

        <p className="text-center text-sm text-neutral-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#C9A14A] font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
