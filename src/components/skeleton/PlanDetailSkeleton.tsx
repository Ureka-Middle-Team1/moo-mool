"use client";

import { Skeleton } from "@/components/ui/skeleton";
import TopGradient from "@/components/planDetail/TopGradient";
import BottomGradient from "@/components/planDetail/BottomGradient";

export default function PlanDetailSkeleton() {
  return (
    <>
      {/* PlanDetailHeader는 그대로 표시 (앱 전체 공통 헤더라면) */}
      <TopGradient />
      <main className="relative flex flex-col items-center space-y-8 overflow-hidden bg-gradient-to-b">
        <section className="relative z-10 w-full space-y-[3rem] px-6 pt-6">
          {/* ✅ PlanInfo 영역 */}
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="h-6 w-40 rounded bg-gray-300" />
            <Skeleton className="h-8 w-3/5 rounded bg-gray-200" />
            <Skeleton className="h-4 w-3/4 rounded bg-gray-200" />
          </div>

          {/* ✅ PlanCharts 영역 */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-32 rounded bg-gray-300" />
            <Skeleton className="h-[200px] w-full rounded-xl bg-gray-200" />
          </div>

          {/* ✅ PlanBenefits 영역 */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded bg-gray-300" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-full rounded-lg bg-gray-200"
                />
              ))}
            </div>
          </div>
        </section>
        <BottomGradient show={true} />
      </main>
    </>
  );
}
