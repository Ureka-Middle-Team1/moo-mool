"use client";

import TendencyRadarChart from "@/components/chart/TendencyRadarChart";
import TendencyBarChart from "@/components/chart/TendencyBarChart";
import { TendencyPlanData } from "@/types/planDetail";

interface PlanChartsProps {
  data: TendencyPlanData;
  mode: "basic" | "compare";
}

export default function PlanCharts({ data, mode }: PlanChartsProps) {
  const isRounded = true;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="h-[320px] w-full">
        <TendencyRadarChart
          isRounded={isRounded}
          data={mode === "basic" ? data.radar : [data.radar, data.compare]}
          name={data.name}
        />
      </div>

      <div className="h-[320px] w-full">
        <TendencyBarChart
          data={mode === "basic" ? data.bar : [data.bar, data.compare]}
          name={data.name}
        />
      </div>
    </div>
  );
}
