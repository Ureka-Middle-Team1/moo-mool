"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { PlanDBApiResponse } from "@/types/PlanData";
import Image from "next/image";

interface PlanListCardProps {
  plan: PlanDBApiResponse;
  hideBenefits?: boolean;
}

export default function PlanListCard({
  plan,
  hideBenefits = false,
}: PlanListCardProps) {
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
      className="xs:max-w-[18rem] w-full max-w-[21rem] cursor-pointer rounded-2xl border border-gray-400 bg-gray-100 px-8 py-5 shadow-md transition">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-gray-800">LG U+</span>
        <span className="text-sm font-semibold text-pink-600">
          월 {price.toLocaleString()}원
        </span>
      </div>
      <div className="text-lg font-bold">{name}</div>

      <div className="scrollbar-hide mt-2 flex w-full flex-nowrap gap-2 overflow-x-auto">
        <Badge className="border-0 bg-[#EEF2FF] whitespace-nowrap text-[#4F46E5]">
          {dataAmountMb === 0
            ? "무제한"
            : `${(dataAmountMb / 1024).toFixed(1)}GB`}
        </Badge>
        <Badge className="border-0 bg-[#ECFDF5] whitespace-nowrap text-[#059669]">
          {voiceMinutes === -1 ? "무제한" : `${voiceMinutes}분`}
        </Badge>
        <Badge className="border-0 bg-[#FFFBEB] whitespace-nowrap text-[#D97706]">
          속도 {overageSpeedMbps ?? 0}Mbps
        </Badge>
        {!hideBenefits && (
          <Badge className="border-0 bg-[#FEF2F2] whitespace-nowrap text-[#DC2626]">
            혜택 가치 {smsIncluded}
          </Badge>
        )}
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
                MILLIE: "/assets/ott/millie.png",
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
