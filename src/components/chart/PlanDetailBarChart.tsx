"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barChartOptions } from "./options/barChartOptions";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface TendencyBarChartProps {
  data: number[] | [number[], number[]];
  rawData: number[] | [number[], number[]];
  name: string;
  labels?: string[];
  colors?: string[];
  height?: number;
}

const TendencyBarChart = ({
  data,
  rawData,
  name,
  labels = ["월정액", "데이터", "속도", "음성통화", "문자"],
  colors = ["rgba(255, 188, 31, 0.6)", "rgba(255, 99, 132, 0.6)"],
  height = 320,
}: TendencyBarChartProps) => {
  const [chartKey, setChartKey] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setChartKey(Date.now());
    }
  }, [data]);

  if (chartKey === null) {
    return null;
  }

  const datasets = Array.isArray(data[0])
    ? [
        {
          label: name,
          data: [...(data as [number[], number[]])[0]],
          rawData: [...(rawData as [number[], number[]])[0]],
          backgroundColor: colors[0],
          borderWidth: 0,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
        {
          label: "내 요금제",
          data: [...(data as [number[], number[]])[1]],
          rawData: [...(rawData as [number[], number[]])[1]],
          backgroundColor: colors[1],
          borderWidth: 0,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
      ]
    : [
        {
          label: name,
          data: [...(data as number[])],
          rawData: [...(rawData as number[])],
          backgroundColor: colors[0],
          borderWidth: 0,
          categoryPercentage: 0.4,
          barPercentage: 0.6,
        },
      ];

  return (
    <div className="w-full" style={{ height }}>
      <Bar
        key={chartKey}
        data={{ labels, datasets }}
        options={barChartOptions}
      />
    </div>
  );
};

export default TendencyBarChart;
