"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TendencyRadarChart from "@/components/chart/PlanDetailRadarChart";
import TendencyBarChart from "@/components/chart/PlanDetailBarChart";

interface FlipCardChartProps {
  radar: number[] | number[][];
  bar: number[] | number[][];
  raw: number[] | number[][];
  name: string;
  mode: "basic" | "compare";
}

export default function FlipCardChart({
  radar,
  bar,
  raw,
  name,
  mode,
}: FlipCardChartProps) {
  const [flipped, setFlipped] = useState(false);
  const isCompare = mode === "compare";

  const radarData: number[] | [number[], number[]] = Array.isArray(radar[0])
    ? (radar as [number[], number[]])
    : (radar as number[]);

  const barData: number[] | [number[], number[]] = Array.isArray(bar[0])
    ? (bar as [number[], number[]])
    : (bar as number[]);

  const rawData: number[] | [number[], number[]] = Array.isArray(raw[0])
    ? (raw as [number[], number[]])
    : (raw as number[]);

  return (
    <div
      className="ml-[-1rem] h-80 w-full max-w-[360px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}>
      <motion.div
        className="relative h-full w-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}>
        {/* 앞면: 레이더 차트 */}
        <div
          className="absolute h-full w-full"
          style={{ backfaceVisibility: "hidden" }}>
          <TendencyRadarChart isRounded={true} data={radarData} name={name} />
        </div>

        {/* 뒷면: 바 차트 */}
        <div
          className="absolute h-full w-full"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}>
          <TendencyBarChart data={barData} rawData={rawData} name={name} />
        </div>
      </motion.div>
    </div>
  );
}
