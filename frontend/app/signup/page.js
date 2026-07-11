"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import AuthLayout from "@/components/features/auth/AuthLayout";
import FormField from "@/components/features/auth/FormField";
import PasswordInput from "@/components/features/auth/PasswordInput";
import GoogleButton from "@/components/features/auth/GoogleButton";
import AuthDivider from "@/components/features/auth/AuthDivider";
import LoadingSpinner from "@/components/features/auth/LoadingSpinner";

import { registerSchema } from "@/lib/validations";
import { authApi } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Contract: POST /auth/register  body: { name, email, password }
      await authApi.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success("Account created", {
        description: "Check your email for the 6-digit verification code.",
      });
      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      toast.error("Registration failed", {
        description: err.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <header className="mb-6">
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#5c0016] tracking-wide uppercase">
          Create Your Account
        </h1>
        <div
          className="w-14 h-0.75 bg-[#C9A14A] mt-3 mb-4"
          aria-hidden="true"
        />
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <FormField
          id="name"
          label="Full Name"
          icon={User}
          autoComplete="name"
          placeholder="Enter your full name"
          error={errors.name?.message}
          {...register("name")}
        />

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

        <FormField
          id="password"
          label="Password"
          icon={Lock}
          error={errors.password?.message}
        >
            <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="Create a password"
            className="h-[46px] pl-10 rounded-2xl"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
        </FormField>

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          icon={Lock}
          error={errors.confirmPassword?.message}
        >
            <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm your password"
            className="h-[46px] pl-10 rounded-2xl"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
        </FormField>

        <div className="pt-1">
          <div className="flex items-start gap-3">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-[2px]"
                />
              )}
            />
            <Label
              htmlFor="terms"
              className="text-sm text-neutral-700 leading-relaxed font-normal"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-[#C9A14A] font-medium hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#C9A14A] font-medium hover:underline"
              >
                Privacy Policy
              </a>
            </Label>
          </div>
          {errors.terms && (
            <p role="alert" className="text-xs text-destructive pl-8 mt-1">
              {errors.terms.message}
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
              <LoadingSpinner /> Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>

        <AuthDivider />

        <GoogleButton />

        <p className="text-center text-sm text-neutral-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#C9A14A] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
