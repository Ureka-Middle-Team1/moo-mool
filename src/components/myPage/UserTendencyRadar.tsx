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
      const imageSize = 45;

      labels.forEach((label: string, index: number) => {
        const angle = r.getIndexAngle(index) - Math.PI / 2;
        const x = centerX + (radius + 38) * Math.cos(angle);
        const y = centerY + (radius + 38) * Math.sin(angle);

        const img = loadedImages.current[label];
        if (img) {
          ctx.drawImage(
            img,
            x - imageSize / 2,
            y - imageSize / 2 - 10,
            imageSize,
            imageSize
          );

          ctx.font = "bold 14px Pretendard";
          ctx.fillStyle = "#EB453F";
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
  };

  return (
    <div
      className="mx-auto h-[22rem] w-full max-w-xl"
      style={{ overflow: "visible" }}>
      <Radar
        data={radarData}
        options={radarOptions}
        plugins={[drawTypeAndName]}
      />
    </div>
  );
}
