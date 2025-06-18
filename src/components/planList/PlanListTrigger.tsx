"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface PlanListTriggerProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function PlanListTrigger({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PlanListTriggerProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  let timeout: NodeJS.Timeout;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      timeout = setTimeout(() => {
        fetchNextPage();
      }, 100); //아주 짧은 debounce 느낌
    }
    return () => clearTimeout(timeout);
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div ref={ref} className="flex h-10 w-full items-center justify-center">
      {isFetchingNextPage && (
        <span className="animate-pulse text-sm text-gray-500">
          📦 불러오는 중...
        </span>
      )}
    </div>
  );
}
