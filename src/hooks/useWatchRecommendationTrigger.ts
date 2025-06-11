import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useRecommendationPlan } from "@/hooks/useRecommendationPlan";

export function useWatchRecommendationTrigger() {
  const currentQuestionId = useChatStore((state) => state.currentQuestionId);
  const { userTendencyInfo } = useTendencyStore();
  const { mutate: recommendPlan } = useRecommendationPlan();

  const hasTriggeredRef = useRef(false); // 중복 방지

  useEffect(() => {
    if (currentQuestionId === 11 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      recommendPlan(userTendencyInfo);
    }
  }, [currentQuestionId, userTendencyInfo]);
}
