// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// optional interceptors
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;