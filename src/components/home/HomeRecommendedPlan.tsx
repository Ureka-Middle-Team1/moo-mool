"use client";

import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetPlanById } from "@/hooks/useGetPlanById";
import { useSession } from "next-auth/react";
import PlanCard from "../chat/PlanCard";

export default function HomeRecommendedPlan() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  if (!userId && status !== "loading") return null;
  const { data: userInfo, isLoading: userLoading } = useGetUserInfo(
    userId ?? ""
  );

  const recommendedPlanId = userInfo?.recommended_plan;

  const {
    data: planData,
    isLoading: planLoading,
    isError: planError,
  } = useGetPlanById(recommendedPlanId);

  if (userLoading || planLoading) return <div>로딩 중...</div>;
  if (!planData || planError)
    return <div>추천 요금제를 불러올 수 없습니다</div>;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <h2 className="text-zinc-900x flex w-full text-lg font-semibold">
        나의 추천 요금제
      </h2>
      <div className="flex w-[18rem] items-center justify-center">
        <PlanCard
          id={planData.id}
          name={planData.name}
          data={
            planData.dataAmountMb === 0
              ? "무제한"
              : `${(planData.dataAmountMb / 1024).toFixed(1)}GB`
          }
          voice={
            planData.voiceMinutes === -1
              ? "무제한"
              : `${planData.voiceMinutes}분`
          }
          sms={planData.smsIncluded ? "포함" : "없음"}
          price={`월 ${planData.price.toLocaleString()}원`}
          tel={planData.networkType}
        />
      </div>
    </div>
  );
}
