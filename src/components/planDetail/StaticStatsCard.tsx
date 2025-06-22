"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Database,
  GaugeCircle,
  Phone,
  Gift,
} from "lucide-react";

interface StaticStatsCardProps {
  raw: number[];
  compareRaw?: number[];
  isCompare: boolean;
}

const iconComponents = [
  { icon: DollarSign, color: "text-amber-400" },
  { icon: Database, color: "text-blue-400" },
  { icon: GaugeCircle, color: "text-red-400" },
  { icon: Phone, color: "text-green-400" },
  { icon: Gift, color: "text-pink-400" },
];

const getLabelByIndex = (i: number, value: number) => {
  switch (i) {
    case 0: return `월 ${value.toLocaleString()}원`;
    case 1: return `월 ${value.toLocaleString()}MB`;
    case 2: return `다 쓰면 ${value.toLocaleString()}Kbps`;
    case 3: return `부가통화 ${value.toLocaleString()}분`;
    case 4: return `혜택 ${value.toLocaleString()}원`;
    default: return value.toString();
  }
};

export default function StaticStatsCard({
  raw,
  compareRaw = [],
  isCompare,
}: StaticStatsCardProps) {
  return (
    <div className="relative flex w-full justify-center gap-16 py-6 min-h-[20rem] overflow-visible">
      <motion.div
        layout
        className="flex flex-col items-center gap-8 min-w-[9rem]"
        transition={{ duration: 0.4 }}
      >
        {raw.map((value, i) => {
          const Icon = iconComponents[i].icon;
          const color = iconComponents[i].color;
          return (
            <div key={`raw-${i}`} className="flex flex-col items-center gap-2">
              <Icon size={36} className={color} />
              <span className="text-md font-bold text-yellow-500">
                {getLabelByIndex(i, value)}
              </span>
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {isCompare && (
          <motion.div
            key="compare"
            className="flex flex-col items-center gap-8 min-w-[9rem]"
            initial={{ opacity: 0, x: "5rem" }}
            animate={{ opacity: 1, x: "0rem" }}
            exit={{ opacity: 0, x: "5rem" }}
            transition={{ duration: 0.4 }}
          >
            {compareRaw.map((value, i) => {
              const Icon = iconComponents[i].icon;
              const color = iconComponents[i].color;
              return (
                <div key={`compare-${i}`} className="flex flex-col items-center gap-2">
                  <Icon size={36} className={color} />
                  <span className="text-md font-bold text-pink-500">
                    {getLabelByIndex(i, value)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
