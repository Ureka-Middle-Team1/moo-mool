import { Skeleton } from "../ui/skeleton";

export default function PlanChartsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 px-6">
      <Skeleton className="h-5 w-32 rounded" />
      <div className="grid w-full grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
