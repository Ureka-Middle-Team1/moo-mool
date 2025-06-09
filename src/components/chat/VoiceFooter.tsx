"use client";

import { Mic } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
export default function VoiceFooter() {
  const { recording, result, toggleRecording } = useVoiceRecorder();

  return (
    <div className="relative flex h-[20%] w-full flex-col items-center justify-center gap-4">
      {/* 배경 원 (마이크 음성 느낌) */}
      <div className="absolute h-64 w-64 rounded-full bg-yellow-200 opacity-30 blur-3xl" />
      <div className="absolute h-44 w-44 rounded-full bg-yellow-200 opacity-40 blur-2xl" />
      <div className="absolute h-28 w-28 rounded-full bg-yellow-200 opacity-60 blur-xl" />

      {/* 마이크 버튼 */}
      <button
        onClick={toggleRecording}
        className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 shadow-md">
        <Mic
          size={28}
          className={`text-gray-700 ${recording ? "animate-ping" : ""}`}
        />
      </button>

      {/* 인식 결과 출력 */}
      {result && (
        <p className="z-10 mt-2 w-5/6 text-center text-sm text-gray-800">
          🎤 {result}
        </p>
      )}
    </div>
  );
}
