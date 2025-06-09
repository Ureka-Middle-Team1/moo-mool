"use client";

import { Mic } from "lucide-react";

export default function VoiceFooter() {
  return (
    <div className="relative flex h-[20%] w-full items-center justify-center">
      {/* 배경 원들 (큰 게 뒤에, 점점 작게 위로 올라감) */}
      <div className="absolute h-64 w-64 rounded-full bg-yellow-200 opacity-30 blur-3xl" />
      <div className="absolute h-44 w-44 rounded-full bg-yellow-200 opacity-40 blur-2xl" />
      <div className="absolute h-28 w-28 rounded-full bg-yellow-200 opacity-60 blur-xl" />

      {/* 마이크 아이콘 */}
      <button className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 shadow-md">
        <Mic size={28} className="text-gray-700" />
      </button>
    </div>
  );
}
