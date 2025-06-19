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

// ✅ props 타입에 rank 추가
type PlanCardProps = {
  id: number;
  name: string;
  data: string;
  voice: string;
  sms: string;
  price: string;
  tel: string;
  rank?: number; // ⭐️ 요금제 순위
};

export default function PlanCard({
  id,
  name,
  data,
  voice,
  sms,
  price,
  tel,
  rank,
}: PlanCardProps) {
  return (
    <div className="relative w-full rounded-xl bg-white p-4 shadow-md">
      {/* ✅ 랭크 뱃지 */}
      {rank && rank <= 3 && (
        <span
          className={`absolute -top-3 -left-3 z-10 rounded-full px-2 py-1 text-xs font-bold text-white shadow ${
            rank === 1
              ? "bg-yellow-400"
              : rank === 2
                ? "bg-gray-400"
                : "bg-orange-500"
          }`}>
          {rank}등
        </span>
      )}

      {/* 기존 카드 내용 */}
      <p className="text-sm text-gray-500">{tel}</p>
      <p className="text-lg font-bold">{name}</p>
      <div className="mt-2 flex gap-2 text-xs">
        <span className="rounded bg-yellow-100 px-2 py-1">{data}</span>
        <span className="rounded bg-yellow-100 px-2 py-1">{voice}</span>
        <span className="rounded bg-yellow-100 px-2 py-1">{sms}</span>
      </div>
      <p className="mt-2 text-right text-sm font-semibold text-red-500">
        {price}
      </p>
    </div>
  );
}
