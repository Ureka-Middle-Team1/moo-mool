"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PlanListCardSkeleton() {
  return (
    <div className="w-full max-w-xs rounded-2xl bg-white p-4 shadow-md">
      <div className="mb-1 flex items-center justify-between">
        <Skeleton width={60} height={16} /> {/* 통신사 */}
        <Skeleton width={80} height={16} /> {/* 가격 */}
      </div>
      <Skeleton width={120} height={20} /> {/* 요금제 이름 */}
      <div className="mt-2 flex gap-2 overflow-x-auto">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} width={60} height={24} borderRadius={12} />
          ))}
      </div>
      <div className="mt-3 flex items-center">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              circle
              width={32}
              height={32}
              style={{ marginLeft: index === 0 ? 0 : -12 }}
            />
          ))}
      </div>
    </div>
  );
}
