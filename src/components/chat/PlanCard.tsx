import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ParsedPlan } from "@/types/Chat";

export default function PlanCard({
  name,
  data,
  voice,
  sms,
  price,
  tel,
}: ParsedPlan) {
  return (
    <Card className="w-full max-w-xs border-0 shadow-lg">
      <CardHeader className="relative flex items-start justify-between px-4 pb-2">
        <span className="text-sm text-gray-800">LG U+</span>
        <CardAction className="text-sm font-semibold text-red-500">
          {price}
        </CardAction>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <CardDescription>
          {voice} + {sms} + {tel} + {data}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
