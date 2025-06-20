import { Skeleton } from "@/components/ui/skeleton";

export default function PlanInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-6 pt-4">
      {/* 상단 영역 */}
      <Skeleton className="h-6 w-36 rounded" />
      <Skeleton className="h-8 w-28 rounded" />

      {/* 태그 3개 */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-10 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* 지표 정보 */}
      <div className="mt-4 space-y-3 rounded-xl bg-white p-4 shadow-sm">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
