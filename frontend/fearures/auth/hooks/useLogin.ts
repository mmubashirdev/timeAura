"use client";
import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";

interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  token?: string;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<LoginResponse>("/auth/login", payload);
      return data;
    },
  });
}