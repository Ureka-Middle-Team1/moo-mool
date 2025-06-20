"use client";

import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetPlanById } from "@/hooks/useGetPlanById";
import { useSession } from "next-auth/react";
import PlanListCard from "../planList/PlanListCard";

export default function HomeRecommendedPlan() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: userInfo, isLoading: userLoading } = useGetUserInfo(
    userId ?? ""
  );
  const recommendedPlanId = userInfo?.recommended_plan;

  const {
    data: planData,
    isLoading: planLoading,
    isError: planError,
  } = useGetPlanById(recommendedPlanId);

  if (status === "loading" || userLoading || planLoading) {
    return <div>로딩 중...</div>;
  }

  if (!userId || !planData || planError) {
    return null; // 또는 <div>추천 요금제를 불러올 수 없습니다</div>
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <h2 className="text-zinc-900x flex w-full text-lg font-semibold">
        나의 추천 요금제
      </h2>
      <div className="flex w-[18rem] items-center justify-center">
        <PlanListCard
          plan={{
            id: planData.id,
            name: planData.name,
            price: planData.price,
            dataAmountMb: planData.dataAmountMb,
            overageSpeedMbps: planData.overageSpeedMbps,
            voiceMinutes: planData.voiceMinutes,
            smsIncluded: planData.smsIncluded,
            networkType: planData.networkType,
            subscriptionServices: planData.subscriptionServices || [],
          }}
          hideBenefits={true}
        />
      </div>
    </div>
  );
}
