import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useRecommendationPlan } from "@/hooks/useRecommendationPlan";
import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";

export function useWatchRecommendationTrigger(
  userTendencyInfo: SmartChoiceApiInput
) {
  const currentQuestionId = useChatStore((state) => state.currentQuestionId);
  const { mutate: recommendPlan } = useRecommendationPlan();

  const hasTriggeredRef = useRef(false); // 중복 방지

  useEffect(() => {
    if (currentQuestionId === 11 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      recommendPlan(userTendencyInfo);
    }
  }, [currentQuestionId]);
}
