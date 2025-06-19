"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

type PlanCardProps = {
  id: number;
  name: string;
  data: string; // e.g. "무제한" or "20GB"
  voice: string; // e.g. "무제한" or "300분"
  sms: string; // e.g. "혜택 가치 5000"
  price: string; // e.g. "월 33,000원"
  tel: string; // e.g. "LG U+"
  rank?: number;
  subscriptions?: string[]; // ✅ OTT 혜택 표시 (optional)
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
  subscriptions = [],
}: PlanCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/plandetail/${id}`);
  };

  const imageSrcMap: Record<string, string> = {
    NETFLIX: "/assets/ott/netflix.jpg",
    YOUTUBE_PREMIUM: "/assets/ott/youtubePremium.png",
    "DISNEY+": "/assets/ott/disney.jpg",
    WAVVE: "/assets/ott/wavve.png",
    TVING: "/assets/ott/tving.png",
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full max-w-xs cursor-pointer rounded-2xl bg-white p-4 shadow-md">
      {/* ✅ 등수 뱃지 */}
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

      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-gray-800">{tel}</span>
        <span className="text-sm font-semibold text-pink-600">{price}</span>
      </div>

      <p className="text-lg font-bold">{name}</p>

      <div className="scrollbar-hide mt-2 flex w-full flex-wrap gap-2 overflow-x-auto text-xs">
        <Badge className="border-0 bg-yellow-100 whitespace-nowrap text-black">
          {data}
        </Badge>
        <Badge className="border-0 bg-yellow-100 whitespace-nowrap text-black">
          {voice}
        </Badge>
        <Badge className="border-0 bg-yellow-100 whitespace-nowrap text-black">
          {sms}
        </Badge>
      </div>

      {/* ✅ 구독 OTT 혜택 아이콘 */}
      {subscriptions.length > 0 && (
        <div className="mt-3 flex items-center">
          {subscriptions.map((service, index) => {
            const imageSrc = imageSrcMap[service];
            return imageSrc ? (
              <Image
                key={service}
                src={imageSrc}
                alt={service}
                width={32}
                height={32}
                className={`rounded-full border-2 border-white object-cover ${
                  index !== 0 ? "-ml-3" : ""
                }`}
                title={service}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
