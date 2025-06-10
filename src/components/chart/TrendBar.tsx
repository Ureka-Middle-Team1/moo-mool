"use client";

import { useEffect, useRef, useState } from "react";

interface TrendBarProps {
  label: string;
  value: number; // 0 ~ 100 (%)
}

export default function TrendBar({ label, value }: TrendBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState("0%");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 마운트 후 width 값을 실제로 설정
    timeoutRef.current = setTimeout(() => {
      setAnimatedWidth(`${value}%`);
    }, 100); // 약간의 딜레이로 자연스럽게 시작

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  return (
    <div className="flex w-full items-center gap-2">
      {/* 왼쪽 레이블 */}
      <span className="w-[20%] text-left text-sm font-medium text-gray-700">
        {label}
      </span>

      {/* 회색 배경 바 */}
      <div className="relative h-2 w-[80%] overflow-hidden rounded-full bg-gray-300">
        {/* 노란 바 (애니메이션 적용) */}
        <div
          className="h-full rounded-r-full bg-yellow-300 transition-all duration-1000 ease-out"
          style={{ width: animatedWidth }}
        />
      </div>
    </div>
  );
}
