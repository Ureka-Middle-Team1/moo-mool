"use client";

import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetPlanById } from "@/hooks/useGetPlanById";
import { useSession } from "next-auth/react";
import PlanListCard from "../planList/PlanListCard";
import PlanListCardSkeleton from "@/components/skeleton/PlanListCardSkeleton";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function HomeRecommendedPlan() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

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
  if (status === "unauthenticated")
    return (
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <h2 className="text-gray-900x flex w-full pl-4 text-lg font-semibold">
          나의 추천 요금제
        </h2>
        <Card
          onClick={() => router.push("/")}
          className="my-2 flex w-[15rem] cursor-pointer flex-col justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-sm md:mx-8 md:max-w-[19rem]">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="truncate text-sm font-semibold text-gray-900">
              아직 추천받은 요금제가 없어요
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-1">
            <p className="truncate text-xs text-gray-600">로그인하러 가기</p>
          </CardContent>
        </Card>
      </div>
    );
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
