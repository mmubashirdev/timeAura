"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api";

export const authKeys = { me: ["auth", "me"] };

export function useCurrentUser({ enabled = true } = {}) {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useRegister() {
  return useMutation({ mutationFn: authApi.register });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      if (res?.data?.user) {
        qc.setQueryData(authKeys.me, { data: { user: res.data.user } });
      }
    },
  });
}

export function useGoogleLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.googleLogin,
    onSuccess: (res) => {
      // Same pattern as useLogin — seed the /me cache
      if (res?.data?.user) {
        qc.setQueryData(authKeys.me, { data: { user: res.data.user } });
      }
    },
  });
}

export function useVerifyEmail() {
  return useMutation({ mutationFn: authApi.verifyEmail });
}

export function useResendVerification() {
  return useMutation({ mutationFn: authApi.resendVerification });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: authApi.forgotPassword });
}

export function useResetPassword() {
  return useMutation({ mutationFn: authApi.resetPassword });
}
