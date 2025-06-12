"use client";

import { useState } from "react";
import { useGetTendencyPlanQuery } from "@/hooks/useGetTendencyPlanQuery";
import Header from "@/components/common/Header";
import { PlanInfo, PlanCharts, PlanBenefits } from "@/components/planDetail";
import { TendencyPlanData } from "@/types/planDetail";

export default function PlanDetailPage() {
  const { data, isLoading, isError, error } = useGetTendencyPlanQuery();
  const [mode, setMode] = useState<"basic" | "compare">("basic");

  if (isLoading)
    return <div className="p-4 text-gray-500">데이터 로딩 중...</div>;
  if (isError) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!data) return <div className="p-4 text-gray-500">데이터 없음</div>;

  const planData: TendencyPlanData = data;

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 bg-gradient-to-b from-[#fff6d8] to-white">
      <section className="w-full max-w-md">
        <Header />
        <PlanInfo data={planData} mode={mode} onChangeMode={setMode} />
        <PlanCharts data={planData} mode={mode} />
        <PlanBenefits benefits={planData.benefits} />
      </section>
    </main>
  );
}
