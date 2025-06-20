import { Skeleton } from "../ui/skeleton";

export default function PlanBenefitsSkeleton() {
  return (
    <div className="space-y-4 px-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
