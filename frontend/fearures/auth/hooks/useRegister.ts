"use client";
import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
  // adjust to match your backend response shape
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<RegisterResponse>(
        "/auth/register",
        payload
      );
      return data;
    },
  });
}