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
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div ref={ref} className="flex h-10 w-full items-center justify-center">
      {isFetchingNextPage && (
        <span className="text-sm text-gray-500">불러오는 중...</span>
      )}
    </div>
  );
}
