import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useSmartChoiceRecommendation } from "@/hooks/useSmartChoiceRecommendation";
import { useFreeTalkSummary } from "./useFreeTalkSummary";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";
import { useSession } from "next-auth/react";
import { usePostChatSession } from "./usePostChatSession";

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
    userMessageCount,
  } = useFreeTalkStore();
  const { hasRecommended, setHasRecommended } = useChatStore();
  const { mutate: recommendPlan } = useSmartChoiceRecommendation();
  const { mutate: summarize } = useFreeTalkSummary();

  const hasSummarizedRef = useRef(false); // 요약 관련해서 중복 방지 필요

  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const postChatSession = usePostChatSession();

  // 렌더링 초기에, chat-message 저장소를 clear 해야 함 (밈테스트 결과도 여기에 저장되기에, 초기화할 필요 있음)
  useEffect(() => {
    if (currentQuestionId === 0) {
      // 질문을 시작하려 할 때
      clearMessages();
    }
  }, []);

  useEffect(() => {
    console.log("변화감지", currentQuestionId);
    // 정해진 질문 로직에서, 마지막 질문까지 모두 완료해서 끝에 도달했을 경우, 이미 추천된 상태가 아닌 경우에만 안의 것 수행
    if (currentQuestionId === 12 && !hasRecommended) {
      // subscribe만 제거한 나머지 필드 추출
      const { subscribe, ...rest } = userTendencyInfo;
      // recommendPlan에는 subscribe 값 제외한 값만 호출, 해당 hook 안에서 구독 서비스까지 호출할 예정
      recommendPlan(rest);
      setHasRecommended(true); // 추천 완료로 표시
    }

    if (hasRecommended) {
      // 이미 추천을 받았다면, 채팅창은 clear될 필요 있음 (chatStore에 저장되어 있는 내용 모두 삭제)
      console.log("추천완료", userId, accurateMessages.length);
      //  ChatSession 저장
      if (userId && accurateMessages.length > 0) {
        postChatSession.mutate({
          userId: userId,
          messages: accurateMessages,
        });
      }
      setCurrentQuestionId(0);
      // clearMessages();
      setHasRecommended(false);
    }
  }, [currentQuestionId, userTendencyInfo, hasRecommended]);

  useEffect(() => {
    // "자연스러운 대화" 모드에서 요약 트리거 조건
    if (
      currentQuestionId === -1 &&
      shouldTriggerSummary() &&
      !hasSummarizedRef.current
    ) {
      hasSummarizedRef.current = true;
      summarize({ lastSummary, messages: freeMessages }); // 요약 수행
      hasSummarizedRef.current = false;
    }
  }, [userMessageCount]);
}
