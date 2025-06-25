"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 전역 조건부 재시도 설정
            retry: (failureCount, error) => {
              const axiosError = error as AxiosError;
              const status = axiosError?.response?.status;

              if (status === 400 || 404) return false; // Not found는 재시도 안 함
              return failureCount < 2; // 그 외는 최대 2회까지 재시도
            },
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
