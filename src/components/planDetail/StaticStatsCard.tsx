"use client";

import { motion } from "framer-motion";
import { LABELS } from "@/constants/labels";

interface StaticStatsCardProps {
  raw: number[];
  compareRaw?: number[];
  isCompare: boolean;
}

export default function StaticStatsCard({
  raw,
  compareRaw = [],
  isCompare,
}: StaticStatsCardProps) {
  const labels = LABELS;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl bg-white shadow-md">
      {labels.map((label, i) => (
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
              {raw[i]?.toLocaleString()}
            </motion.span>

            {isCompare && (
              <motion.span
                className="absolute text-sm font-bold text-pink-400"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}>
                {compareRaw[i]?.toLocaleString()}
              </motion.span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
