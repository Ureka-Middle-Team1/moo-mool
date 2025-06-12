"use client";

import { useState, useEffect } from "react";
import { useGetPlanDetailQuery } from "@/hooks/useGetPlanDetailQuery";
import {
  PlanInfo,
  PlanCharts,
  PlanBenefits,
  PlanDetailHeader,
  TopGradient,
  BottomGradient,
} from "@/components/planDetail";
import { PlanDetailData } from "@/types/planDetail";

export default function PlanDetailPage() {
  const { data, isLoading, isError, error } = useGetPlanDetailQuery();
  const [mode, setMode] = useState<"basic" | "compare">("basic");
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    setShowGradient(mode === "compare");
  }, [mode]);

  if (isLoading)
    return <div className="p-4 text-gray-500">데이터 로딩 중...</div>;
  if (isError) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!data) return <div className="p-4 text-gray-500">데이터 없음</div>;

  const planData: PlanDetailData = data;

  return (
    <main className="relative flex min-h-screen flex-col items-center space-y-8 overflow-hidden bg-gradient-to-b from-[#fff6d8] to-white">
      <TopGradient />

      <section className="relative z-10 w-full max-w-md">
        <PlanDetailHeader />
        <PlanInfo data={planData} mode={mode} onChangeMode={setMode} />
        <PlanCharts data={planData} mode={mode} />
        <PlanBenefits benefits={planData.benefits} />
      </section>

      <BottomGradient show={showGradient} />
    </main>
  );
}
