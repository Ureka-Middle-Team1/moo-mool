"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Message } from "@/types/Message";
import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";
import Header from "@/components/common/Header";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useRecommendationPlan } from "@/hooks/useRecommendationPlan";
import { questionTextMap } from "@/lib/chatbot/chatBotQuestionFlow";
import { getNextQuestionId } from "@/lib/chatbot/getNextQuestionId";
import { useNormalizeAnswer } from "@/hooks/useNormalizeAnswer";
import { mapTendencyData } from "@/lib/chatbot/mapTendencyData";

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

  // 해당하는 각 Hook을 통해, API로 요청 -> 응답 진행
  const { mutate: recommendPlan } = useRecommendationPlan();
  const { mutate: normalizeAnswer } = useNormalizeAnswer();

  // 최종 질문 단계가 끝났을 경우를 탐지해서 smartchoice api 호출
  useEffect(() => {
    if (currentQuestionId === 11) {
      // 현재는 currentQuestionId가 11인 경우에 수행, 최종 요약 기능 추가 시 변경 필요
      recommendPlan(userTendencyInfo);
    }
  }, [currentQuestionId]);

  // smartchoice API에 전송할 정보를 업데이트하는 updateTendency
  const updateTendency = (patch: Partial<SmartChoiceApiInput>) =>
    setUserTendencyInfo((prev) => ({ ...prev, ...patch }));

  const handleNormalizedAnswer = (userMessage: string) => {
    // 1. 사용자 메시지 출력
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // 2. mutate 객체 활용해서 정규화 요청
    normalizeAnswer(
      {
        message: userMessage,
        questionId: currentQuestionId,
      },
      {
        onSuccess: (data) => {
          // 3. 정규화된 응답에 대해 데이터를 갱신하는 mapTendencyData() 호출 후 update
          const patch = mapTendencyData(
            currentQuestionId,
            data.normalizedValue,
            userTendencyInfo
          );
          updateTendency(patch);

          // 4. 다음 질문 ID 계산
          const nextId = getNextQuestionId(
            currentQuestionId,
            data.normalizedValue
          );

          // nextId가 undefined가 아닐 때만..
          if (nextId !== undefined && data.normalizedValue !== "INVALID") {
            setCurrentQuestionId(nextId);

            const nextQuestion = questionTextMap[nextId];
            if (nextQuestion) {
              // nextQuestion이 비어있지 않을 때만..
              setMessages((prev) => [
                ...prev,
                { role: "bot", content: nextQuestion },
              ]);
            }
          } else {
            // 재질문 필요 시
            const sameQuestion = questionTextMap[currentQuestionId];
            if (sameQuestion) {
              setMessages((prev) => [
                ...prev,
                { role: "bot", content: sameQuestion },
              ]);
            }
          }
        },
        onError: () => {
          // 4. 실패 메시지
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              content:
                "죄송해요! 뭔가 잘못됐어요. 다시 한 번 입력해 주실 수 있나요?",
            },
          ]);
        },
      }
    );
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
