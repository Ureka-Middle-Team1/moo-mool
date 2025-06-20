import StaticStatsCard from "@/components/planDetail/StaticStatsCard";
import FlipCardChart from "@/components/planDetail/FlipCardChart";
import { PlanDetailData } from "@/types/planDetail";

interface PlanChartsProps {
  data: PlanDetailData;
  mode: "basic" | "compare";
}

export default function PlanCharts({ data, mode }: PlanChartsProps) {
  const isCompare = mode === "compare";

  const raw = isCompare ? [data.raw, data.compareRaw] : data.raw;
  const radar = isCompare ? [data.radar, data.compare] : data.radar;
  const bar = isCompare ? [data.bar, data.compare] : data.bar;

  const rawBase = isCompare ? data.raw : data.raw;
  const rawCompare = isCompare ? data.compareRaw : [];

  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <div className="flex h-80 w-full max-w-md items-center justify-center">
        <StaticStatsCard
          raw={rawBase}
          compareRaw={rawCompare}
          isCompare={isCompare}
        />
      </div>

      <div className="ml-[2rem] h-80 w-[85%]">
        <FlipCardChart
          radar={radar}
          bar={bar}
          raw={raw}
          name={data.name}
          mode={mode}
        />
      </div>
    </div>
  );
}
