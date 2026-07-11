"use client";
import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";

interface ResetPasswordPayload {
  email: string;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<ResetPasswordResponse>(
        "/auth/forgot-password",
        payload
      );
      return data;
    },
  });
}