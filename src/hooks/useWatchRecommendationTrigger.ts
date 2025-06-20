import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useSmartChoiceRecommendation } from "@/hooks/useSmartChoiceRecommendation";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";

// 요금제 추천 로직과 관련해서 지속적으로 상태를 지켜 보고 있는 useWatchRecommendationTrigger
export function useWatchRecommendationTrigger() {
  const {
    currentQuestionId,
    messages: accurateMessages,
    clearMessages,
    setCurrentQuestionId,
  } = useChatStore();
  const { userTendencyInfo } = useTendencyStore();
  const {
    messages: freeMessages,
    shouldTriggerSummary,
    lastSummary,
  } = useFreeTalkStore();
  const { hasRecommended, setHasRecommended } = useChatStore();
  const { mutate: recommendPlan } = useSmartChoiceRecommendation();

  // 렌더링 초기에, chat-message 저장소를 clear 해야 함 (밈테스트 결과도 여기에 저장되기에, 초기화할 필요 있음)
  useEffect(() => {
    if (currentQuestionId === 0) {
      // 질문을 시작하려 할 때
      clearMessages();
    }
  }, []);

  useEffect(() => {
    // 정해진 질문 로직에서, 마지막 질문까지 모두 완료해서 끝에 도달했을 경우, 이미 추천된 상태가 아닌 경우에만 안의 것 수행
    if (currentQuestionId === 12 && !hasRecommended) {
      // subscribe만 제거한 나머지 필드 추출
      const { subscribe, ...rest } = userTendencyInfo;
      // recommendPlan에는 subscribe 값 제외한 값만 호출, 해당 hook 안에서 구독 서비스까지 호출할 예정
      recommendPlan(rest);
      setHasRecommended(true); // 추천 완료로 표시
    }
  }, [currentQuestionId, userTendencyInfo]);

  useEffect(() => {
    // "자연스러운 대화" 모드에서 Smart Choice API 요청 확인
    const isAllFilled = Object.values(userTendencyInfo).every(
      (value) => value !== ""
    );

    if (isAllFilled && !hasRecommended) {
      // 추천 받은 적 없고, 모든 userTendencyInfo가 채워진 경우
      setCurrentQuestionId(12);
    }
  }, [freeMessages]); // freeMessages가 변하는 것은, "자연스러운 대화" 모드에서만 변경됨
}
