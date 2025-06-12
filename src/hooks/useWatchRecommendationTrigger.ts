import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useSmartChoiceRecommendation } from "@/hooks/useSmartChoiceRecommendation";
import { parsePlans } from "@/types/Chat";
import { useChatbotRecommendationPlan } from "./useChatbotRecommendationPlan";

export function useWatchRecommendationTrigger() {
  const currentQuestionId = useChatStore((state) => state.currentQuestionId);
  const addMessage = useChatStore((state) => state.appendMessage);
  const { userTendencyInfo } = useTendencyStore();
  const { mutate: chatbotRecommendPlan } = useChatbotRecommendationPlan({
    // 스마트 초이스로 가져온 거..
    onSuccess: (data) => {
      if (data.result.length > 0) {
        addMessage({
          role: "bot",
          content: "이 요금제가 어울릴 것 같아요!",
          type: "text",
        });

        addMessage({
          role: "bot",
          content: "",
          type: "plan",
          planData: data.result[0],
        });
      }
    },
  });

  const { mutate: recommendPlan } = useSmartChoiceRecommendation({
    onSuccess: (data) => {
      const parsed = parsePlans(data);
      // SmartChoice 결과를 이용해 chatbot 요청 진행
      chatbotRecommendPlan({
        smartChoicePlans: parsed,
        subscribe: userTendencyInfo.subscribe,
      });
    },
  });

  const hasTriggeredRef = useRef(false); // 중복 방지

  useEffect(() => {
    if (currentQuestionId === 13 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      // subscribe만 제거한 나머지 필드 추출
      const { subscribe, ...rest } = userTendencyInfo;

      // subscription 제외한 값으로 recommendPlan 호출 (subscribe는 smart choice api 호출 시 필요없는 사안)
      recommendPlan(rest);
    }
  }, [currentQuestionId, userTendencyInfo]);
}
