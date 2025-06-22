"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChatMessageListSkeleton() {
  return (
    <div className="flex flex-col gap-6 bg-pink-100 px-4 py-5">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          {/* 무너 프로필 이미지 */}
          <Skeleton className="mt-1 h-8 w-8 rounded-full bg-gray-300" />

          <div className="flex flex-col gap-1">
            {/* 이름 */}
            <div className="h-3 w-10 rounded bg-gray-300" />

            {/* 흰색 배경에 약한 테두리 스타일의 말풍선 */}
            <div className="rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-gray-300 bg-white px-4 py-3">
              <Skeleton className="h-4 w-[200px] bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
