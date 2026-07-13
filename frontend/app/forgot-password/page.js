"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/features/auth/AuthLayout";
import FormField from "@/components/features/auth/FormField";
import LoadingSpinner from "@/components/features/auth/LoadingSpinner";

import { forgotPasswordSchema } from "@/lib/validations";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const forgotMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = (values) => {
    // Contract: POST /auth/forgot-password  body: { email }
    forgotMutation.mutate(
      { email: values.email },
      {
        onSuccess: () => {
          setSent(true);
          toast.success("Check your email", {
            description:
              "If an account exists, a 6-digit reset code has been sent.",
          });
          // Take the user to the reset-password screen with email prefilled
          setTimeout(() => {
            router.push(
              `/reset-password?email=${encodeURIComponent(values.email)}`,
            );
          }, 1200);
        },
        onError: (err) => {
          toast.error("Something went wrong", {
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
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-[#800020]/10 flex items-center justify-center self-center mb-4">
          <Lock className="w-6 h-6 text-[#800020]" strokeWidth={1.8} />
        </div>

        <header className="text-center mb-6">
          <h1 className="font-serif text-2xl xl:text-3xl font-bold text-[#5c0016] tracking-wide uppercase">
            Reset Your Password
          </h1>
          <div
            className="w-14 h-[3px] bg-[#C9A14A] mt-2 mb-3 mx-auto"
            aria-hidden="true"
          />
          <p className="text-neutral-600 text-sm">
            Enter your email address and we&apos;ll send you a 6-digit code to
            reset your password.
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

          <Button
            type="submit"
            disabled={forgotMutation.isPending || sent}
            className="mt-1 h-11 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.15em] text-xs uppercase shadow-lg shadow-[#5c0016]/20"
          >
            {forgotMutation.isPending ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner /> Sending...
              </span>
            ) : sent ? (
              "Code Sent ✓"
            ) : (
              "Send Reset Code"
            )}
          </Button>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-neutral-600 hover:text-[#800020] transition-colors mt-2"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back to Login
          </Link>
        </form>

        {/* Reassurance banner */}
        <div className="mt-6 flex items-start gap-3 p-3 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
          <ShieldCheck
            className="w-4 h-4 text-[#C9A14A] shrink-0 mt-0.5"
            strokeWidth={1.8}
          />
          <p className="text-xs text-neutral-600 leading-relaxed">
            We&apos;ll never share your email with anyone. Your security is our
            priority.
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
