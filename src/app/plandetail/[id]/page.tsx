"use client";

import { useState, useEffect } from "react";
import {
  PlanInfo,
  PlanCharts,
  PlanBenefits,
  PlanDetailHeader,
  TopGradient,
  BottomGradient,
} from "@/components/planDetail";
import { PlanDetailData } from "@/types/planDetail";
import { useParams } from "next/navigation";
import { useGetPlanById } from "@/hooks/useGetPlanById";
import { mapPlanToDetailData } from "@/utils/mapPlanToDetailData";

export default function PlanDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError, error } = useGetPlanById(
    isNaN(id) ? undefined : id
  );

  const [mode, setMode] = useState<"basic" | "compare">("basic");
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    setShowGradient(mode === "compare");
  }, [mode]);

  if (isLoading)
    return <div className="p-4 text-gray-500">데이터 로딩 중...</div>;
  if (isError) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!data) return <div className="p-4 text-gray-500">데이터 없음</div>;

  const planData: PlanDetailData = mapPlanToDetailData(data);

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
