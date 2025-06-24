import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useSmartChoiceRecommendation } from "@/hooks/useSmartChoiceRecommendation";
import { useSession } from "next-auth/react";
import { usePostChatbotSummary } from "./usePostChatbotSummary";
import { usePostChatSession } from "./usePostChatSession";

// 요금제 추천 로직과 관련해서 지속적으로 상태를 지켜 보고 있는 useWatchRecommendationTrigger
export function useWatchRecommendationTrigger() {
  const { currentQuestionId, clearMessages } = useChatStore();
  const { userTendencyInfo } = useTendencyStore();
  const { hasRecommended, messages, chatSummary, recommendedPlanId } =
    useChatStore();
  const { mutateAsync: recommendPlanAsync } = useSmartChoiceRecommendation();
  const { data: session } = useSession();
  const { mutateAsync: submitSummaryAsync } = usePostChatSession();

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
          // SmartChoice 추천 로직이 끝날 때까지 기다림, planId는 직접 넘겨 받음
          await recommendPlanAsync(rest);
        } catch (err) {
          console.error("추천 흐름 중 오류:", err);
        }
      }
    };

    runRecommendation(); // 추천 + 요약 정보 저장 수행
  }, [currentQuestionId, userTendencyInfo]);

  // "요금제 카드" 내용까지 모두 localStorage에 업데이트 되었을 경우, 조건 검사해서 DB 저장 수행
  useEffect(() => {
    if (messages[messages.length - 1].type === "plan") {
      console.log("집가고싶다");
    } else if (recommendedPlanId !== 0) {
      console.log("왜 이거는 됌?");
    }
    if (
      messages[messages.length - 1].type === "plan" &&
      recommendedPlanId !== 0 &&
      chatSummary !== ""
    ) {
      console.log("messages 여기에 진입");
      // 메시지의 맨 끝이 요금제 카드일 경우에만
      submitSummaryAsync({
        // DB에 있는 ChatSession 테이블 안에 저장한다
        userId: session?.user.id!,
        messages,
        summary: chatSummary,
        planId: recommendedPlanId,
      }).then(() => {
        console.log("요약 저장 완료");
      });
    }
  }, [messages, recommendedPlanId, chatSummary]);
}
