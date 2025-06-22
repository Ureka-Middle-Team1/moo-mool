import { ChartOptions } from "chart.js";

// Radar 차트 옵션 정의
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
        color: "#555",
        backdropColor: "transparent",
        font: { size: 10, weight: "bold" },
        padding: 18,
        z: 1,
        display: true,
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
        circular: !isRounded, //옵션 파라미터에 따라 원형/다각형 결정
      },
      angleLines: { color: "rgba(0, 0, 0, 0.1)" },
      pointLabels: {
        color: "#333",
        font: { size: 14, weight: 500 },
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
});
