import { ChartOptions } from "chart.js";

// Radar 차트 옵션 정의 (dataset 개별 애니메이션으로 관리 중이므로, global animation은 없음)
export const getRadarChartOptions = (
  isRounded: boolean
): ChartOptions<"radar"> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        color: "#888",
        backdropColor: "transparent",
        font: { size: 8, weight: 400 }, // weight를 string으로 변경 (Chart.js v4에서 타입 안정성)
        padding: 18,
        z: 1,
        display: true,
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
        circular: !isRounded, // 옵션 파라미터에 따라 원형/다각형 결정
      },
      angleLines: { color: "rgba(0, 0, 0, 0.1)" },
      pointLabels: {
        color: "#666",
        font: { size: 12, weight: 500 }, // 여기도 string으로 통일
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
});
