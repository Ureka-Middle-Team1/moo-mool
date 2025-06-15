import { ChartOptions, TooltipItem } from "chart.js";

//Bar 차트 옵션 정의
export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  indexAxis: "y",
  maintainAspectRatio: false,
  layout: {
    padding: { right: 24 },
  },
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      ticks: { display: false },
      grid: {
        lineWidth: 1,
        color: "rgba(0, 0, 0, 0.2)",
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        font: { size: 10 },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: { size: 10 },
        boxWidth: 10,
        boxHeight: 10,
      },
      onClick: () => {}, //범례 클릭 숨김기능 제거
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          const label = context.dataset.label || "";
          const value = context.raw as number;
          const index = context.dataIndex;

          let displayValue = "";

          switch (index) {
            case 0:
              displayValue = `월 ${value} 원`;
              break;
            case 1:
              displayValue = `월 ${value} MB`;
              break;
            case 2:
              displayValue = `다 쓰면 ${value} Mbps`;
              break;
            case 3:
              displayValue = `부가통화 ${value} 분`;
              break;
            case 4:
              displayValue = value === 100 ? "기본제공 O" : "기본제공 X";
              break;
            default:
              displayValue = `${value}`;
          }

          return `${label}: ${displayValue}`;
        },
      },
    },
  },
};
