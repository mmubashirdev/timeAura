"use client";

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
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values) => {
    // Contract: POST /auth/login  body: { email, password }
    loginMutation.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: (res) => {
          if (res?.data?.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
          }
          toast.success("Welcome back", { description: "You're signed in." });
          router.push("/");
        },
        onError: (err) => {
          toast.error("Sign in failed", {
            description: err.message || "Please check your credentials.",
          });
        },
      },
    );
  };

  return (
    <AuthLayout>
      <header className="mb-5">
        <h1 className="font-serif text-2xl xl:text-3xl font-bold text-[#5c0016] tracking-wide uppercase">
          Welcome Back
        </h1>
        <div
          className="w-12 h-[3px] bg-[#C9A14A] mt-2 mb-3"
          aria-hidden="true"
        />
        <p className="text-neutral-600 text-sm">
          Sign in to continue your Time Aura experience.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
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

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-800"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#C9A14A] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 z-10 pointer-events-none"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="pl-9"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p role="alert" className="text-[11px] text-destructive pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="mt-1 h-11 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.15em] text-xs uppercase shadow-lg shadow-[#5c0016]/20"
        >
          {loginMutation.isPending ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner /> Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>

        <AuthDivider />

        <GoogleButton />

        <p className="text-center text-xs text-neutral-600 mt-3">
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
