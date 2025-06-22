"use client";

import { Mic } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import ShadowRing from "./ShadowRing";
import { useHandleAnswer } from "@/hooks/useHandleAnswer";
import { useEffect, useState } from "react";
import { useTTSStore } from "@/store/useTTSStore";
import { Button } from "../ui/button";
import { useBotResponseGuard } from "@/hooks/useBotResponseGuard";
import { useVoiceControlStore } from "@/store/useVoiceControlStore";
import { useChatStore } from "@/store/useChatStore";
import { handleFreeTalkAnswer } from "@/lib/chat/handleFreeTalkAnswer";

export default function VoiceFooter() {
  const { recording, result, toggleRecording } = useVoiceRecorder();
  const { currentQuestionId, setCurrentQuestionId, appendMessage } =
    useChatStore();
  const { handleNormalizedAnswer } = useHandleAnswer();
  const { setWaitingForBotResponse } = useVoiceControlStore();
  const isSpeaking = useTTSStore((state) => state.isSpeaking);
  const [waitingTrigger, setWaitingTrigger] = useState(false);
  useBotResponseGuard(waitingTrigger);

  // 음성 인식 결과가 나올 때 자동으로 handleAnswer 실행 (자연스러운 대화 흐름일 경우엔 callGPTFreeTalk 호출)
  useEffect(() => {
    if (!result) return; // result가 비어 있으면 그냥 return

    // 분기 처리를 진행하는 메소드 processVoiceInput
    const processVoiceInput = async () => {
      setWaitingTrigger(true);
      setWaitingForBotResponse(true);

      // "자연스러운 대화" 모드인 경우
      if (currentQuestionId === -1) {
        await handleFreeTalkAnswer(result, setCurrentQuestionId);
      } else {
        // 아닌 경우
        await handleNormalizedAnswer(result);
      }
    };

    processVoiceInput();
  }, [result]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 py-4">
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
