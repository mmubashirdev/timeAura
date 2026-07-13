"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock, ArrowLeft, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/features/auth/AuthLayout";
import FormField from "@/components/features/auth/FormField";
import PasswordInput from "@/components/features/auth/PasswordInput";
import LoadingSpinner from "@/components/features/auth/LoadingSpinner";

import { newPasswordSchema } from "@/lib/validations";
import { useResetPassword } from "@/hooks/useAuth";

function NewPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const resetMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    mode: "onBlur",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  // Guard: if the user landed here directly without a code, bounce them to step 1
  useEffect(() => {
    if (!email || code.length !== 6) {
      toast.error("Missing information", {
        description: "Please enter your reset code first.",
      });
      router.replace("/reset-password");
    }
  }, [email, code, router]);

  const onSubmit = (values) => {
    // Contract: POST /auth/reset-password  body: { email, code, newPassword }
    // The code is validated by the backend as part of this call — if it's
    // wrong here, we send the user back to step 1 to re-enter it.
    resetMutation.mutate(
      { email, code, newPassword: values.newPassword },
      {
        onSuccess: () => {
          toast.success("Password reset", {
            description: "Sign in with your new password.",
          });
          router.push("/login");
        },
        onError: (err) => {
          toast.error("Reset failed", {
            description:
              err.message ||
              "The code may be invalid or expired. Please try again.",
          });
          // Wrong/expired code → back to step 1 with email preserved
          if (err.status === 401 || err.status === 403) {
            router.replace(
              `/reset-password?email=${encodeURIComponent(email)}`,
            );
          }
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
          <Lock className="w-6 h-6 text-[#800020]" strokeWidth={1.8} />
        </div>

        <header className="text-center mb-6">
          <h1 className="font-serif text-2xl xl:text-3xl font-bold text-[#5c0016] tracking-wide uppercase">
            Set New Password
          </h1>
          <div
            className="w-14 h-[3px] bg-[#C9A14A] mt-2 mb-3 mx-auto"
            aria-hidden="true"
          />
          <p className="text-neutral-600 text-sm">
            Choose a strong password for{" "}<br></br>
            <span className="font-semibold text-neutral-800 break-all">
              {email}
            </span>
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <FormField
            id="newPassword"
            label="New Password"
            icon={Lock}
            error={errors.newPassword?.message}
          >
            <PasswordInput
              id="newPassword"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="pl-9"
              aria-invalid={!!errors.newPassword}
              {...register("newPassword")}
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
              placeholder="Re-enter your new password"
              className="pl-9"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </FormField>

          <Button
            type="submit"
            disabled={resetMutation.isPending}
            className="mt-1 h-11 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white font-semibold tracking-[0.15em] text-xs uppercase shadow-lg shadow-[#5c0016]/20"
          >
            {resetMutation.isPending ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner /> Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-neutral-600 hover:text-[#800020] transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back to Login
          </Link>
        </form>

        <div className="mt-6 flex items-start gap-3 p-3 rounded-xl bg-neutral-100/70 border border-neutral-200/60">
          <ShieldCheck
            className="w-4 h-4 text-[#C9A14A] shrink-0 mt-0.5"
            strokeWidth={1.8}
          />
          <p className="text-xs text-neutral-600 leading-relaxed">
            After resetting, all existing sessions will be signed out.
            You&apos;ll need to sign in again on every device.
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={null}>
      <NewPasswordContent />
    </Suspense>
  );
}
