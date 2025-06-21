import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useSmartChoiceRecommendation } from "@/hooks/useSmartChoiceRecommendation";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";
import { usePostChatbotSummary } from "./usePostChatbotSummary";
import { useSession } from "next-auth/react";

// 요금제 추천 로직과 관련해서 지속적으로 상태를 지켜 보고 있는 useWatchRecommendationTrigger
export function useWatchRecommendationTrigger() {
  const { data: session } = useSession(); // 로그인 정보 가져오기
  const { messages } = useChatStore();

  const {
    currentQuestionId,
    clearMessages,
    setCurrentQuestionId,
    setChatSummary,
  } = useChatStore();
  const { userTendencyInfo, resetTendency } = useTendencyStore();
  const { messages: freeMessages, clear } = useFreeTalkStore();
  const { hasRecommended, setHasRecommended, recommendedPlanId } =
    useChatStore();
  const { mutateAsync: recommendPlanAsync } = useSmartChoiceRecommendation();
  const { mutate: chatHistorySummary } = usePostChatbotSummary();

  // 렌더링 초기에, chat-message 저장소를 clear 해야 함 (밈테스트 결과도 여기에 저장되기에, 초기화할 필요 있음)
  useEffect(() => {
    if (currentQuestionId === 0) {
      // 질문을 시작하려 할 때
      clearMessages();
    }
  }, []);

  useEffect(() => {
    // 정해진 질문 로직에서, 마지막 질문까지 모두 완료해서 끝에 도달했을 경우, 이미 추천된 상태가 아닌 경우에만 안의 것 수행
    const runRecommendation = async () => {
      if (currentQuestionId === 12 && !hasRecommended) {
        const { subscribe, ...rest } = userTendencyInfo;

        try {
          // 1. SmartChoice 추천 로직이 끝날 때까지 기다림
          await recommendPlanAsync(rest);

          // 2. 채팅 내역의 요약본 저장
          chatHistorySummary({
            userId: session?.user.id,
            messages,
            planId: recommendedPlanId,
          });

          // 3. 추천된 상태라고 표시
          setHasRecommended(true);
        } catch (err) {
          console.error("추천 흐름 중 오류:", err);
        }
      }
    };

    runRecommendation(); // 추천 + 요약 정보 저장 수행
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
