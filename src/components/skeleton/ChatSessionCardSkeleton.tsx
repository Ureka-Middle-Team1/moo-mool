import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ChatSessionCardSkeleton() {
  return (
    <Card className="w-[13rem] flex-shrink-0 flex-col justify-center rounded-xl border border-gray-300 bg-white p-3 shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle>
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <Skeleton className="h-3 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
