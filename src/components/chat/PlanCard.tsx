import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { ParsedPlanWithID } from "@/types/Chat";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export default function PlanCard({
  id,
  name,
  data,
  voice,
  sms,
  price,
  tel,
}: ParsedPlanWithID) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/plandetail/${id}`);
  };
  return (
    <Card
      className="w-full max-w-xs cursor-pointer border-0 shadow-lg"
      onClick={handleClick}>
      <CardHeader className="relative flex items-start justify-between px-4 pb-2">
        <span className="text-sm text-gray-800">LG U+</span>
        <CardAction className="text-sm font-semibold text-pink-600">
          {price}
        </CardAction>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        {/* 배지 영역 */}
        <div className="scrollbar-hide mt-2 flex w-full gap-2 overflow-x-auto pb-1">
          <Badge
            variant="outline"
            className="border-0 bg-yellow-100 whitespace-nowrap">
            {data}
          </Badge>
          <Badge
            variant="outline"
            className="border-0 bg-yellow-100 whitespace-nowrap">
            {voice}
          </Badge>
          <Badge
            variant="outline"
            className="border-0 bg-yellow-100 whitespace-nowrap">
            SMS {sms}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
