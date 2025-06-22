import { ChartDataset, ChartOptions, TooltipItem } from "chart.js";

interface ExtendedBarDataset extends ChartDataset<"bar", number[]> {
  rawData?: (number | undefined)[];
}

//Bar 차트 옵션 정의
export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  indexAxis: "y",
  maintainAspectRatio: false,
  layout: {
    padding: { right: 24 },
  },
  animations: {
    x: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    y: {
      duration: 0,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      ticks: {
        font: {
          size: 12,
        },
        color: "#555",
      },
      grid: {
        lineWidth: 1,
        color: "rgba(0, 0, 0, 0.2)",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
          weight: "bold",
        },
        color: "#333",
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: {
          size: 12,
        },
        boxWidth: 10,
        boxHeight: 10,
      },
      onClick: () => {}, //범례 클릭 숨김 기능 제거
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          const dataset = context.dataset as ExtendedBarDataset;
          const index = context.dataIndex;
          const rawData = dataset.rawData?.[index];

          if (rawData === undefined) {
            return `${context.dataset.label}: ${context.parsed.x}%`;
          }

          switch (context.label) {
            case "월정액":
              return `월 ${rawData}원`;
            case "데이터":
              return `월 ${rawData}MB`;
            case "속도":
              return `다 쓰면 ${rawData}Kbps`;
            case "음성통화":
              return `${rawData}분`;
            case "문자":
              return `혜택 ${rawData}원`;
            default:
              return `${rawData}`;
          }
        },
      },
    },
  },
};
