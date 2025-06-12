import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useRecommendationPlan } from "@/hooks/useRecommendationPlan";
import { parsePlans } from "@/types/Chat";

export function useWatchRecommendationTrigger() {
  const currentQuestionId = useChatStore((state) => state.currentQuestionId);
  const addMessage = useChatStore((state) => state.appendMessage);
  const { userTendencyInfo } = useTendencyStore();
  const { mutate: recommendPlan } = useRecommendationPlan({
    onSuccess: (data) => {
      const parsed = parsePlans(data);
      if (parsed.length > 0) {
        addMessage({
          role: "bot",
          content: "이 요금제가 어울릴 것 같아요!",
          type: "text",
        });

        addMessage({
          role: "bot",
          content: "",
          type: "plan",
          planData: parsed[0],
        });
      }
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
