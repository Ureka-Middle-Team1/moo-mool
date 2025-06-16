"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import type { ChartOptions } from "chart.js";
import EmptyRadarPlaceholder from "./EmptyRadarPlaceholder";

// Chart.js 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function UserTendencyRadar() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  // 로그인 안 된 경우 → PlaceHolder 반환
  if (!userId && status !== "loading") {
    return <EmptyRadarPlaceholder />;
  }

  const { data, isLoading } = useGetUserCharacterProfile(userId ?? "");

  if (status === "loading" || isLoading) return <div>로딩 중...</div>;
  if (!data) return <EmptyRadarPlaceholder />;

  const radarData = {
    labels: ["SNS", "Youtube", "Chat", "Calling", "Books", "Saving"],
    datasets: [
      {
        label: "나의 선호도",
        data: [
          data.sns_level,
          data.youtube_level,
          data.sms_level,
          data.call_level,
          data.book_level,
          data.saving_level,
        ],
        fill: true,
        backgroundColor: "rgba(253, 207, 86, 0.2)",
        borderColor: "rgb(253, 207, 86)",
        pointBackgroundColor: "rgb(253, 207, 86)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(253, 207, 86)",
      },
    ],
  };

  const radarOptions: ChartOptions<"radar"> = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        pointLabels: {
          font: {
            family: "Pretendard-Regular",
            size: 15,
            weight: "bold",
          },
          color: "#EB453F",
        },
        grid: {
          color: "rgba(241, 145, 187, 0.2)",
          lineWidth: 10,
        },
        angleLines: {
          color: "rgba(241, 145, 187, 0.4)",
        },
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: "#F191BB",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 4,
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="mx-auto max-w-xl">
      <Radar data={radarData} options={radarOptions} />
    </div>
  );
}
