"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChatbotHeaderSkeleton() {
  return (
    <div className="flex h-12 items-center justify-between px-4">
      {/* 왼쪽: 뒤로가기 아이콘 자리 */}
      <Skeleton className="h-6 w-6 rounded" />

      {/* 가운데: 제목 */}
      <Skeleton className="h-5 w-24 rounded" />

      {/* 오른쪽: 햄버거 자리 (있는 경우) */}
      <Skeleton className="h-6 w-6 rounded" />
    </div>
  );
}
