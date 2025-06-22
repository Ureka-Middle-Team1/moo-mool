"use client";

import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetPlanById } from "@/hooks/useGetPlanById";
import { useSession } from "next-auth/react";
import PlanListCard from "../planList/PlanListCard";
import PlanListCardSkeleton from "@/components/skeleton/PlanListCardSkeleton";

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

  const isLoadingAll = status === "loading" || userLoading || planLoading;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <h2 className="text-gray-900x flex w-full pl-4 text-lg font-semibold">
        나의 추천 요금제
      </h2>

      <div className="flex w-[21rem] items-center justify-center">
        {isLoadingAll || !userId ? (
          <PlanListCardSkeleton />
        ) : planData && !planError ? (
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
              badges: planData.badges || [],
            }}
            hideBenefits={true}
          />
        ) : null}
      </div>
    </div>
  );
}
