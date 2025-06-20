import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ChatSessionCardSkeleton() {
  return (
    <Card className="min-w-full flex-shrink-0 flex-col justify-center rounded-xl bg-white shadow-md">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-2/3 rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="mt-2 h-4 w-3/4 rounded-md" />
      </CardContent>
    </Card>
  );
}
