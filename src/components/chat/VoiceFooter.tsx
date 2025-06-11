"use client";

import { Mic } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import ShadowRing from "./ShadowRing";
import { useHandleAnswer } from "@/hooks/useHandleAnswer";
import { useEffect } from "react";
import { useTTSStore } from "@/store/useTTSStore";
import { Button } from "../ui/button";

export default function VoiceFooter() {
  const { recording, result, toggleRecording } = useVoiceRecorder();
  const { handleNormalizedAnswer } = useHandleAnswer();
  const isSpeaking = useTTSStore((state) => state.isSpeaking);

  // 음성 인식 결과가 나올 때 자동으로 handleAnswer 실행
  useEffect(() => {
    if (result) {
      console.log(result);
      handleNormalizedAnswer(result);
    }
  }, [result]);

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
      <Button
        onClick={toggleRecording}
        disabled={isSpeaking}
        className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 shadow-md">
        <Mic
          size={30}
          className={`text-gray-700 ${recording ? "animate-ping" : ""}`}
        />
      </Button>

      {/*  인식된 텍스트 출력 */}
      {result && (
        <p className="z-10 mt-2 w-5/6 text-center text-sm text-gray-800">
          🎤 {result}
        </p>
      )}
    </div>
  );
}
