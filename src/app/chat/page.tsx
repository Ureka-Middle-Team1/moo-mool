"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";
import Header from "@/components/common/Header";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useNormalizeAnswerFlow } from "@/hooks/useNormalizeAnswerFlow";
import { useChatStore } from "@/store/useChatStore";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";

type Mode = "text" | "voice";

// 챗봇 페이지 (음성/텍스트 버전 페이지는 해당 컴포넌트의 하위 컴포넌트로 들어와 조건부 처리됨)
export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Mode) || "text";

  const { appendMessage, currentQuestionId } = useChatStore();

  const [userTendencyInfo, setUserTendencyInfo] = useState<SmartChoiceApiInput>(
    {
      data: "",
      voice: "",
      sms: "",
      age: "",
      type: "",
      dis: "",
    }
  );

  useWatchRecommendationTrigger(userTendencyInfo);

  // smartchoice API에 전송할 정보를 업데이트하는 updateTendency
  const updateTendency = (patch: Partial<SmartChoiceApiInput>) =>
    setUserTendencyInfo((prev) => ({ ...prev, ...patch }));

  // 해당하는 각 Hook을 통해, API로 요청 -> 응답 진행
  const { mutate: normalizeAnswer } = useNormalizeAnswerFlow({
    userTendencyInfo,
    updateTendency,
  });

  const handleNormalizedAnswer = (userMessage: string) => {
    // 1. 사용자 메시지 출력
    appendMessage({ role: "user", content: userMessage });
    // 2. mutate 객체 활용해서 정규화 요청
    normalizeAnswer({ message: userMessage, questionId: currentQuestionId });
  };

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? (
          <TextPage onUserSubmit={handleNormalizedAnswer} />
        ) : (
          <VoicePage onUserSubmit={handleNormalizedAnswer} />
        )}
      </div>
    </div>
  );
}
