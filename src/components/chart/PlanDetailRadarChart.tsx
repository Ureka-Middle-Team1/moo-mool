"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartDataset,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { getRadarChartOptions } from "./options/radarChartOptions";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TendencyRadarChartProps {
  isRounded: boolean;
  data: number[] | [number[], number[]];
  name: string;
  labels?: string[];
}

const easing = "easeOutQuart" as const;

const TendencyRadarChart = ({
  isRounded,
  data,
  name,
  labels = ["월정액", "데이터", "속도", "음성통화", "문자"],
}: TendencyRadarChartProps) => {
  const [chartKey, setChartKey] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setChartKey(Date.now());
    }
  }, [data]);

  if (chartKey === null) {
    return null;
  }

  const datasets = [
    {
      label: "기준값",
      data: [100, 100, 100, 100, 100],
      fill: true,
      backgroundColor: "rgba(200, 200, 255, 0.2)",
      borderColor: "rgba(200, 200, 255, 0.3)",
      borderWidth: 1,
      pointRadius: 0,
      animations: false as unknown as ChartDataset<
        "radar",
        number[]
      >["animations"],
    },
    ...(Array.isArray(data[0])
      ? [
          {
            label: name,
            data: [...(data as [number[], number[]])[0]],
            fill: true,
            backgroundColor: "rgba(255, 188, 31, 0.2)",
            borderColor: "rgba(255, 188, 31, 0.8)",
            borderWidth: 1.5,
            pointRadius: 0,
            animations: { tension: { duration: 1000, easing } },
          },
          {
            label: "내 요금제",
            data: [...(data as [number[], number[]])[1]],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 0.8)",
            borderWidth: 1.5,
            pointRadius: 0,
            animations: { tension: { duration: 1000, easing } },
          },
        ]
      : [
          {
            label: name,
            data: [...(data as number[])],
            fill: true,
            backgroundColor: "rgba(255, 188, 31, 0.2)",
            borderColor: "rgba(255, 188, 31, 0.8)",
            borderWidth: 1.5,
            pointRadius: 0,
            animations: { tension: { duration: 1000, easing } },
          },
        ]),
  ];

  return (
    <div className="h-[320px] w-full">
      <Radar
        key={chartKey}
        data={{ labels, datasets }}
        options={getRadarChartOptions(isRounded)}
      />
    </div>
  );
};

export default TendencyRadarChart;
