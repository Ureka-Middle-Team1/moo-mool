"use client";

import { useState, useRef } from "react";
import TendencyRadarChart from "@/components/chart/PlanDetailRadarChart";
import TendencyBarChart from "@/components/chart/PlanDetailBarChart";
import { useInView, motion } from "framer-motion";

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

  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px", //중앙 기준 감지
    once: true,
  });

  const radarData = Array.isArray(radar[0])
    ? (radar as [number[], number[]])
    : (radar as number[]);
  const barData = Array.isArray(bar[0])
    ? (bar as [number[], number[]])
    : (bar as number[]);
  const rawData = Array.isArray(raw[0])
    ? (raw as [number[], number[]])
    : (raw as number[]);

  return (
    <motion.div
      ref={ref}
      className="ml-[-1rem] h-[20rem] w-full max-w-[22.5rem] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      animate={
        isInView ? { rotateY: [0, 60, -50, 30, -20, 0] } : { rotateY: 0 }
      }
      transition={{
        duration: 1.2,
        ease: "easeInOut",
      }}>
      <motion.div
        className="relative h-full w-full transition-transform duration-300"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.2 }}>
        <div
          className="absolute h-full w-full"
          style={{ backfaceVisibility: "hidden" }}>
          <TendencyRadarChart isRounded={true} data={radarData} name={name} />
        </div>
        <div
          className="absolute h-full w-full"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}>
          <TendencyBarChart data={barData} rawData={rawData} name={name} />
        </div>
      </motion.div>
    </motion.div>
  );
}
