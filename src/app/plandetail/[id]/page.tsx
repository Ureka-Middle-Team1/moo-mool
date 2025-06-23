"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import PlanInfo from "@/components/planDetail/PlanInfo";
import PlanCharts from "@/components/planDetail/PlanCharts";
import PlanBenefits from "@/components/planDetail/PlanBenefits";
import PlanDetailHeader from "@/components/planDetail/PlanDetailHeader";
import TopGradient from "@/components/planDetail/TopGradient";
import BottomGradient from "@/components/planDetail/BottomGradient";

import PlanInfoSkeleton from "@/components/skeleton/PlanInfoSkeleton";
import PlanChartsSkeleton from "@/components/skeleton/PlanChartsSkeleton";
import PlanBenefitsSkeleton from "@/components/skeleton/PlanBenefitsSkeleton";

import { useGetPlanById } from "@/hooks/useGetPlanById";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { getScoreContext } from "@/utils/planScore";
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";
import { PlanDetailData } from "@/types/planDetail";

export default function PlanDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const {
    data: currentPlan,
    isLoading: loadingPlan,
    isError,
    error,
  } = useGetPlanById(isNaN(id) ? undefined : id);

  const { data: myPlanData, isLoading: loadingMyPlan } = useGetMyPlan();

  const myPlanId = myPlanData?.my_plan;
  const shouldCompare = !!myPlanId && !loadingMyPlan;

  const { data: myPlanDetail, isLoading: loadingMyPlanDetail } = useGetPlanById(
    shouldCompare ? myPlanId : undefined
  );

  const [mode, setMode] = useState<"basic" | "compare">("basic");
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    setShowGradient(mode === "compare");
  }, [mode]);

  const isLoadingContent =
    loadingPlan || (mode === "compare" && loadingMyPlanDetail);

  // 에러 또는 데이터 없음 처리
  if (isError) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!currentPlan && !loadingPlan)
    return <div className="p-4 text-gray-500">데이터 없음</div>;

  const scoreContext = currentPlan
    ? getScoreContext(
        shouldCompare && myPlanDetail
          ? [currentPlan, myPlanDetail]
          : [currentPlan]
      )
    : null;

  const planData: PlanDetailData | null =
    currentPlan && scoreContext
      ? mapPlanToDetailData(
          currentPlan,
          scoreContext,
          shouldCompare && myPlanDetail ? myPlanDetail : undefined
        )
      : null;

  return (
    <>
      <PlanDetailHeader />
      <main className="relative flex flex-col items-center space-y-8 overflow-hidden bg-gray-200">
        <TopGradient />
        <section className="relative z-10 w-full space-y-[1rem]">
          {isLoadingContent || !planData ? (
            <PlanInfoSkeleton />
          ) : (
            <PlanInfo
              data={planData}
              mode={mode}
              onChangeMode={setMode}
              disabled={!shouldCompare}
            />
          )}

          {isLoadingContent || !planData ? (
            <PlanChartsSkeleton />
          ) : (
            <PlanCharts data={planData} mode={mode} />
          )}

          {isLoadingContent || !planData ? (
            <PlanBenefitsSkeleton />
          ) : planData.benefits.length > 0 ? (
            <PlanBenefits benefits={planData.benefits} />
          ) : (
            <div className="h-12" />
          )}
        </section>
        <BottomGradient show={showGradient} />
      </main>
    </>
  );
}
