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
    <motion.div
      className="ml-[-1rem] h-80 w-full max-w-[360px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      initial={{ y: 0 }}
      whileInView={{ y: [-4, 4, -2, 2, 0] }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className="relative h-full w-full transition-transform duration-300"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* 앞면: 레이더 차트 */}
        <div
          className="absolute h-full w-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <TendencyRadarChart isRounded={true} data={radarData} name={name} />
        </div>

        {/* 뒷면: 바 차트 */}
        <div
          className="absolute h-full w-full"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <TendencyBarChart data={barData} rawData={rawData} name={name} />
        </div>
      </motion.div>
    </motion.div>
  );
}
