import TendencyBarChart from "@/components/chart/PlanDetailBarChart";
import { PlanDetailData } from "@/types/planDetail";

type Props = {
  planChartData: PlanDetailData;
};

export default function PlanChart({ planChartData }: Props) {
  return (
    <div className="mt-4 w-full max-w-full overflow-x-hidden">
      <TendencyBarChart
        data={planChartData.bar}
        rawData={planChartData.raw}
        name={planChartData.name}
        colors={["rgba(241, 145, 187, 0.6)", "rgba(241, 145, 187, 0.6)"]}
        height={260}
      />
    </div>
  );
}
