"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StaticStatsCardProps {
  raw: number[];
  compareRaw?: number[];
  isCompare: boolean;
}

const labels = ["월정액", "월 데이터", "소진 시 속도", "부가통화", "혜택"];

const getValueLabel = (i: number, value: number) => {
  switch (i) {
    case 0:
      return `${value.toLocaleString()}원`;
    case 1:
      return `${value.toLocaleString()}MB`;
    case 2:
      return `${value.toLocaleString()}Kbps`;
    case 3:
      return `${value.toLocaleString()}분`;
    case 4:
      return `${value.toLocaleString()}원`;
    default:
      return value.toString();
  }
};

export default function StaticStatsCard({
  raw,
  compareRaw = [],
  isCompare,
}: StaticStatsCardProps) {
  return (
    <div className="w-full px-9">
      <div className="flex flex-col divide-y divide-gray-200">
        {raw.map((value, i) => (
          <div
            key={`row-${i}`}
            className="flex items-center justify-between py-3 text-sm sm:text-base">
            {/* 좌측 라벨 */}
            <span className="text-gray-800">{labels[i]}</span>

            {/* 우측 값 영역 */}
            <div className="flex min-w-[10rem] items-center justify-end gap-2">
              {/* 기존 값 → 항상 motion span으로 */}
              <motion.span
                animate={{ x: isCompare ? -8 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-semibold text-gray-900 sm:text-base">
                {getValueLabel(i, value)}
              </motion.span>

              {/* 비교 값 → 조건부 애니메이션 */}
              <AnimatePresence>
                {isCompare && compareRaw[i] !== undefined && (
                  <motion.span
                    key={`compare-${i}`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-semibold text-pink-500 sm:text-base">
                    {getValueLabel(i, compareRaw[i])}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
