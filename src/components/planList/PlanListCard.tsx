"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { PlanDBApiResponse } from "@/types/PlanData";
import Image from "next/image";

interface PlanListCardProps {
  plan: PlanDBApiResponse;
}

export default function PlanListCard({ plan }: PlanListCardProps) {
  const router = useRouter();
  const {
    id,
    name,
    price,
    dataAmountMb,
    voiceMinutes,
    smsIncluded,
    overageSpeedMbps,
    subscriptionServices,
  } = plan;

  const handleClick = () => {
    router.push(`/plandetail/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-xs cursor-pointer rounded-2xl bg-white p-4 shadow-md">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-gray-800">LG U+</span>
        <span className="text-sm font-semibold text-pink-600">
          월 {price.toLocaleString()}원
        </span>
      </div>
      <div className="text-lg font-bold">{name}</div>

      <div className="scrollbar-hide mt-2 flex w-full flex-wrap gap-2 overflow-x-auto">
        <Badge className="border-0 bg-blue-100 whitespace-nowrap text-blue-800">
          {dataAmountMb === 0
            ? "무제한"
            : `${(dataAmountMb / 1024).toFixed(1)}GB`}
        </Badge>
        <Badge className="border-0 bg-green-100 whitespace-nowrap text-green-800">
          {voiceMinutes === -1 ? "무제한" : `${voiceMinutes}분`}
        </Badge>
        <Badge className="border-0 bg-purple-100 whitespace-nowrap text-purple-800">
          속도 {overageSpeedMbps ?? 0}Mbps
        </Badge>
        <Badge className="border-0 bg-pink-100 whitespace-nowrap text-pink-800">
          혜택 가치 {smsIncluded}
        </Badge>
      </div>

      {Array.isArray(subscriptionServices) &&
        subscriptionServices.length > 0 && (
          <div className="mt-3 flex items-center">
            {subscriptionServices.map((service, index) => {
              const imageSrcMap: Record<string, string> = {
                NETFLIX: "/assets/ott/netflix.jpg",
                YOUTUBE_PREMIUM: "/assets/ott/youtubePremium.png",
                "DISNEY+": "/assets/ott/disney.jpg",
                WAVVE: "/assets/ott/wavve.png",
                TVING: "/assets/ott/tving.png",
              };

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
