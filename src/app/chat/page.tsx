"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Message } from "@/types/Chat";
import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";
import Header from "@/components/common/Header";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useRecommendationPlan } from "@/hooks/useRecommendationPlan";
import { useNormalizeAnswerFlow } from "@/hooks/useNormalizeAnswerFlow";

type Mode = "text" | "voice";

// 챗봇 페이지 (음성/텍스트 버전 페이지는 해당 컴포넌트의 하위 컴포넌트로 들어와 조건부 처리됨)
export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Mode) || "text";

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1); // 현재 질문 id

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

  // smartchoice API에 전송할 정보를 업데이트하는 updateTendency
  const updateTendency = (patch: Partial<SmartChoiceApiInput>) =>
    setUserTendencyInfo((prev) => ({ ...prev, ...patch }));

  // 해당하는 각 Hook을 통해, API로 요청 -> 응답 진행
  const { mutate: recommendPlan } = useRecommendationPlan();
  const { mutate: normalizeAnswer } = useNormalizeAnswerFlow({
    setCurrentQuestionId,
    userTendencyInfo,
    updateTendency,
    setMessages,
  });

  // 최종 질문 단계가 끝났을 경우를 탐지해서 smartchoice api 호출
  useEffect(() => {
    if (currentQuestionId === 11) {
      // 현재는 currentQuestionId가 11인 경우에 수행, 최종 요약 기능 추가 시 변경 필요
      recommendPlan(userTendencyInfo);
    }
  }, [currentQuestionId]);

  const handleNormalizedAnswer = (userMessage: string) => {
    // 1. 사용자 메시지 출력
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // 2. mutate 객체 활용해서 정규화 요청
    normalizeAnswer({ message: userMessage, questionId: currentQuestionId });
  };

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? (
          <TextPage
            messages={messages}
            setMessages={setMessages}
            onUserSubmit={handleNormalizedAnswer}
          />
        ) : (
          <VoicePage />
        )}
      </div>
    </div>
  );
}
