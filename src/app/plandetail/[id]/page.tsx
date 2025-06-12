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
    <main className="relative flex flex-col items-center overflow-hidden bg-white">
      <section className="relative z-10 w-full max-w-md">
        <PlanDetailHeader />
        {/* <TopGradient /> */}
        <div
          className="w-full pb-4"
          style={{ background: "linear-gradient(#fff6d8 -50%, white)" }}>
          <PlanInfo data={planData} mode={mode} onChangeMode={setMode} />
          <PlanCharts data={planData} mode={mode} />
        </div>

        <div className="relative flex min-h-[30rem] w-full flex-col">
          <div
            className={`h-[30rem] w-full transition-opacity duration-700 ${
              showGradient ? "opacity-50" : "opacity-0"
            }`}
            style={{
              marginTop: "2.5rem",
              background: "linear-gradient(to top, #ffe4e8 60%, transparent)",
            }}
          />
          <div className="relative z-10 -mt-[22rem]">
            <PlanBenefits benefits={planData.benefits} />
          </div>
        </div>
      </section>
    </main>
  );
}
