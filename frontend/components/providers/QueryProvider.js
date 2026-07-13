"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({ children }) {
  // useState ensures the client is created ONCE per browser session,
  // never re-created on re-renders (which would wipe the cache).
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 min — don't refetch aggressively
            gcTime: 5 * 60 * 1000, // 5 min in-memory retention
            refetchOnWindowFocus: false, // luxury feel: no jitter on tab focus
            retry: 1,
          },
          mutations: {
            retry: 0, // never auto-retry POSTs
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
