"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TendencyRadarChart from "@/components/chart/PlanDetailRadarChart";

interface RadarFlipCardProps {
  radar: number[] | [number[], number[]];
  raw: number[] | [number[], number[]];
  name: string;
  mode: "basic" | "compare";
}

export default function RadarFlipCard({
  radar,
  raw,
  name,
  mode,
}: RadarFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const isCompare = mode === "compare";

  const rawBase = Array.isArray(raw[0])
    ? (raw as [number[], number[]])[0]
    : (raw as number[]);
  const rawCompare = Array.isArray(raw[0])
    ? (raw as [number[], number[]])[1]
    : [];

  const radarData = radar;

  return (
    <div
      className="perspective h-80 w-full max-w-[360px]"
      onClick={() => setFlipped(!flipped)}>
      <motion.div
        className="relative h-full w-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}>
        {/* 앞면 */}
        <div
          className="absolute h-full w-full"
          style={{ backfaceVisibility: "hidden" }}>
          <TendencyRadarChart
            isRounded={true}
            data={
              Array.isArray(radar[0])
                ? (radar as [number[], number[]])
                : (radar as number[])
            }
            name={name}
          />
        </div>

        {/* 뒷면: 수치 카드 */}
        <div className="absolute flex h-full w-full rotate-y-180 flex-col items-center justify-center gap-3 rounded-xl bg-white shadow-md backface-hidden">
          {["월정액", "데이터", "속도", "음성통화", "문자"].map((label, i) => (
            <motion.div
              key={label}
              className="flex w-[330px] items-center justify-between rounded-lg px-4 py-2 shadow"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}>
              <span className="w-[72px] text-left text-sm font-semibold text-gray-600">
                {label}
              </span>

              <div className="relative flex w-[150px] items-center justify-end">
                <motion.span
                  className="absolute text-sm font-bold text-yellow-500"
                  animate={isCompare ? { x: -80 } : { x: 0 }}
                  transition={{ duration: 0.3 }}>
                  {rawBase[i]?.toLocaleString()}
                </motion.span>

                {isCompare && (
                  <motion.span
                    className="absolute text-sm font-bold text-pink-400"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}>
                    {rawCompare[i]?.toLocaleString()}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
