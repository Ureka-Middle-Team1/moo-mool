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
import EmptyRadarPlaceholder from "../home/EmptyRadarPlaceholder";
import { useEffect, useRef, useState } from "react";

// Chart.js 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const iconSrcMap: Record<string, string> = {
  SNS: "/assets/moono/sns-moono.png",
  Youtube: "/assets/moono/youtube-moono.png",
  Chat: "/assets/moono/chat-moono.png",
  Calling: "/assets/moono/calling-moono.png",
  Books: "/assets/moono/books-moono.png",
  Saving: "/assets/moono/saving-moono.png",
};

// 한글 라벨 매핑
const labelMap: Record<string, string> = {
  SNS: "인싸력",
  Youtube: "영상중독",
  Chat: "답장센스",
  Calling: "수다력",
  Books: "책잘알",
  Saving: "절약",
};

export default function UserTendencyRadar() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data, isLoading } = useGetUserCharacterProfile(userId ?? "");

  // 이미지들을 저장할 ref
  const loadedImages = useRef<Record<string, HTMLImageElement>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 이미지 한 번만 로드
  useEffect(() => {
    let loadCount = 0;
    const labels = Object.keys(iconSrcMap);

    labels.forEach((label) => {
      const img = new Image();
      img.src = iconSrcMap[label];
      img.onload = () => {
        loadedImages.current[label] = img;
        loadCount++;
        if (loadCount === labels.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // 에러시에도 카운트 올려서 무한 대기 방지
        loadCount++;
        if (loadCount === labels.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // drawTypeAndName 플러그인에서 한글 라벨 사용
  const drawTypeAndName = {
    id: "drawTypeAndName",
    afterDraw(chart: any) {
      if (!imagesLoaded) return; // 이미지가 모두 로드된 후에만 그림

      const {
        ctx,
        scales: { r },
      } = chart;

      const labels = chart.data.labels;
      if (!labels) return;

      const centerX = r.xCenter;
      const centerY = r.yCenter;
      const radius = r.drawingArea;
      const imageSize = 42;

      labels.forEach((label: string, index: number) => {
        // 기존 영문 라벨과 한글 라벨 매핑
        const engLabel =
          Object.keys(labelMap).find((key) => labelMap[key] === label) || label;

        const angle = r.getIndexAngle(index) - Math.PI / 2;
        const x = centerX + (radius + 38) * Math.cos(angle);
        const y = centerY + (radius + 38) * Math.sin(angle);

        const img = loadedImages.current[engLabel];
        if (img) {
          ctx.drawImage(
            img,
            x - imageSize / 2,
            y - imageSize / 2 - 10,
            imageSize,
            imageSize
          );

          ctx.font = "14px Pretendard";
          ctx.fillStyle = "#1A1A1A";
          ctx.textAlign = "center";
          ctx.fillText(label, x, y + imageSize / 2 + 4);
        }
      });
    },
  };

  if (status === "loading" || isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!imagesLoaded) {
    return <div>이미지 로딩 중...</div>;
  }

  if (!userId || !data) {
    return <EmptyRadarPlaceholder />;
  }

  const radarData = {
    labels: ["인싸력", "영상중독", "답장센스", "수다력", "책잘알", "절약"],
    datasets: [
      {
        label: "나의 능력치",
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
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 60,
        bottom: 60,
        left: 45,
        right: 45,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        pointLabels: {
          display: false,
        },
        grid: {
          color: "#E5E7EB", // 연한 회색 등으로 변경
          lineWidth: 1, // 선 굵기 얇게
        },
        angleLines: {
          color: "#E5E7EB", // 연한 회색 등으로 변경
        },
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: "#8a8a8a",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0, // 곡선 → 직선
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
  };

  return (
    <div
      className="mx-auto h-[20rem] w-full max-w-xl"
      style={{ overflow: "visible" }}>
      <Radar
        data={radarData}
        options={radarOptions}
        plugins={[drawTypeAndName]}
      />
    </div>
  );
}
