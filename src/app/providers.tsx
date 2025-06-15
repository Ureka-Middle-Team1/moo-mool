"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; 

// TanStack Query 환경 구성
// QueryClient는 한 번만 생성되어야 하므로 useState 사용
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 데이터가 5분간 fresh한 상태로 유지됨 (성능 최적화)
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false, // 창 이동 시 refetch 비활성화
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
