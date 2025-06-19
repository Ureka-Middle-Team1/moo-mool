"use client";

import { PlanDetailData } from "@/types/planDetail";
import TendencyBarChart from "@/components/chart/PlanDetailBarChart";
import RadarFlipCard from "@/components/planDetail/RadarFlipCard";

interface PlanChartsProps {
  data: PlanDetailData;
  mode: "basic" | "compare";
}

export default function PlanCharts({ data, mode }: PlanChartsProps) {
  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <div className="flex h-80 w-full max-w-md items-center justify-center">
        <RadarFlipCard
          radar={mode === "basic" ? data.radar : [data.radar, data.compare]}
          raw={mode === "basic" ? data.raw : [data.raw, data.compareRaw]}
          name={data.name}
          mode={mode}
        />
      </div>

      <div className="ml-[2rem] h-80 w-[85%]">
        <TendencyBarChart
          data={mode === "basic" ? data.bar : [data.bar, data.compare]}
          rawData={mode === "basic" ? data.raw : [data.raw, data.compareRaw]}
          name={data.name}
        />
      </div>
    </div>
  );
}
