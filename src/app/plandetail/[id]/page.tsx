"use client";

import { useState, useEffect } from "react";
import PlanInfo from "@/components/planDetail/PlanInfo";
import PlanCharts from "@/components/planDetail/PlanCharts";
import PlanBenefits from "@/components/planDetail/PlanBenefits";
import PlanDetailHeader from "@/components/planDetail/PlanDetailHeader";
import TopGradient from "@/components/planDetail/TopGradient";
import BottomGradient from "@/components/planDetail/BottomGradient";

import { PlanDetailData } from "@/types/planDetail";
import { useParams } from "next/navigation";
import { useGetPlanById } from "@/hooks/useGetPlanById";
import { useGetMyPlan } from "@/hooks/useGetMyPlan";
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";
import { getScoreContext } from "@/utils/planScore";

export default function PlanDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const {
    data: currentPlan,
    isLoading: loadingPlan,
    isError,
    error,
  } = useGetPlanById(isNaN(id) ? undefined : id);

  const {
    data: myPlanData,
    isLoading: loadingMyPlan,
    isError: errorMyPlan,
  } = useGetMyPlan();

  const myPlanId = myPlanData?.my_plan ?? undefined;
  const shouldCompare =
    !!myPlanData && myPlanId !== undefined && !loadingMyPlan;

  const { data: myPlanDetail, isLoading: loadingMyPlanDetail } = useGetPlanById(
    shouldCompare ? myPlanId : undefined
  );

  const [mode, setMode] = useState<"basic" | "compare">("basic");
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    setShowGradient(mode === "compare");
  }, [mode]);

  if (loadingPlan || (mode === "compare" && loadingMyPlanDetail))
    return <div className="p-4 text-gray-500">데이터 로딩 중...</div>;
  if (isError) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!currentPlan) return <div className="p-4 text-gray-500">데이터 없음</div>;

  const scoreContext = getScoreContext(
    shouldCompare && myPlanDetail ? [currentPlan, myPlanDetail] : [currentPlan]
  );

  const planData: PlanDetailData = mapPlanToDetailData(
    currentPlan,
    scoreContext,
    shouldCompare && myPlanDetail ? myPlanDetail : undefined
  );

  return (
    <>
      <PlanDetailHeader />
      <main className="relative flex flex-col items-center space-y-8 overflow-hidden bg-gradient-to-b">
        <TopGradient />
        <section className="relative z-10 w-full space-y-[3rem]">
          <PlanInfo
            data={planData}
            mode={mode}
            onChangeMode={setMode}
            disabled={!shouldCompare}
          />
          <PlanCharts data={planData} mode={mode} />
          {planData.benefits.length > 0 ? (
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
