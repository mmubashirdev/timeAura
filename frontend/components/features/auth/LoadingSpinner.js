"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ className = "w-4 h-4" }) {
  return <Loader2 className={`${className} animate-spin`} />;
}
