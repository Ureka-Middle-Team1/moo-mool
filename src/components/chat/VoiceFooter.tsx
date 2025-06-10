"use client";

import { Mic } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import ShadowRing from "./ShadowRing";

export default function VoiceFooter() {
  const { recording, result, toggleRecording } = useVoiceRecorder();

  return (
    <div className="relative flex h-[20%] w-full flex-col items-center justify-center gap-4">
      {/*  음성 인식 중일 때 그림자 애니메이션 */}
      <ShadowRing
        isActive={recording}
        color="bg-yellow-300"
        blurStrength="blur-3xl"
        baseSize={15}
        offsetBottom="3.2rem"
      />

      {/*  마이크 버튼 */}
      <button
        onClick={toggleRecording}
        className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 shadow-md">
        <Mic
          size={28}
          className={`text-gray-700 ${recording ? "animate-ping" : ""}`}
        />
      </button>

      {/*  인식된 텍스트 출력 */}
      {result && (
        <p className="z-10 mt-2 w-5/6 text-center text-sm text-gray-800">
          🎤 {result}
        </p>
      )}
    </div>
  );
}
