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
import { useGetAllPlans } from "@/hooks/useGetAllPlans"; // ✅ [추가]
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";
import { getScoreContext } from "@/utils/planScore"; // ✅ [추가]

export default function PlanDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const {
    data: currentPlan,
    isLoading: loadingPlan,
    isError,
    error,
  } = useGetPlanById(isNaN(id) ? undefined : id); // ✅ [기존 통합: currentPlan으로 통일]

  const { data: allPlans, isLoading: loadingAll } = useGetAllPlans(); // ✅ [전체 요금제 목록 가져오기]

  const [mode, setMode] = useState<"basic" | "compare">("basic");
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    setShowGradient(mode === "compare");
  }, [mode]);

  if (loadingPlan || loadingAll)
    // ✅ [로딩 상태 통합]
    return <div className="p-4 text-gray-500">데이터 로딩 중...</div>;
  if (isError) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!currentPlan || !allPlans || allPlans.length === 0)
    // ✅ [안전 체크 추가]
    return <div className="p-4 text-gray-500">데이터 없음</div>;

  const scoreContext = getScoreContext(allPlans); // ✅ [정규화 기준 계산]
  const planData: PlanDetailData = mapPlanToDetailData(
    currentPlan,
    scoreContext
  ); // ✅ [정제된 요금제 데이터 생성]

  return (
    <>
      <PlanDetailHeader />
      <main className="relative flex flex-col items-center space-y-8 overflow-hidden bg-gradient-to-b pt-24">
        <TopGradient />
        <section className="relative z-10 w-full space-y-[3rem]">
          <PlanInfo data={planData} mode={mode} onChangeMode={setMode} />
          <PlanCharts data={planData} mode={mode} />
          {planData.benefits.length > 0 ? (
            <PlanBenefits benefits={planData.benefits} />
          ) : (
            <div className="h-12" /> // ✅ [혜택 없을 때 여백 유지]
          )}
        </section>
        <BottomGradient show={showGradient} />
      </main>
    </>
  );
}
