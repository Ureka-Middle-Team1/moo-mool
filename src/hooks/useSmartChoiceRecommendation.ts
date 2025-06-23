import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { parsePlans } from "@/types/Chat";
import { useGetFinalPlanInChatbot } from "./useGetFinalPlanInChatbot";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";
import { usePostChatbotSummary } from "./usePostChatbotSummary";

// 스마트 초이스에서 응답을 받아오는 useSmartChoiceRecommendation
export function useSmartChoiceRecommendation() {
  const { userTendencyInfo } = useTendencyStore();
  const { setRecommendedPlanId, setHasRecommended } = useChatStore();
  const addMessage = useChatStore((state) => state.appendMessage);
  const { mutate: chatHistorySummaryAsync } = usePostChatbotSummary();

  // 구독 서비스까지 포함해서 추천을 수행
  const { mutateAsync: getFinalPlanInChatbotAsync } =
    useGetFinalPlanInChatbot();

  return useMutation({
    mutationFn: async (input: SmartChoiceApiInput) => {
      const res = await client.post("/smartchoice", input); // smart choice 호출
      const parsed = parsePlans(res.data);

      const planData = await getFinalPlanInChatbotAsync({
        // subscribe(구독) 정보까지 고려해서 DB를 통해 요금제 정보를 찾아온다
        smartChoicePlans: parsed,
        subscribe: userTendencyInfo.subscribe,
      });

      if (!planData) throw new Error("추천된 요금제가 없습니다."); // planData가 존재하지 않다면..

      setRecommendedPlanId(planData.id);
      addMessage({
        role: "bot",
        content: "너에게 딱맞는 요금제 추천해줄게!",
        type: "plan",
        planData,
      });

      return { messages: useChatStore.getState().messages }; // mutation이 planId를 반환하게 함
    },
    retry: 3, // 최대 3회까지 재시도
    onSuccess: async ({ messages }) => {
      try {
        await chatHistorySummaryAsync({
          // 얘가 끝날 때까지 기다림
          messages, // 최신 messages를 바로 전달
        });

        setHasRecommended(true); // 요약 저장 후 실행됨
        console.log("추천 및 요약 저장 완료!");
      } catch (err) {
        console.error("요약 저장 실패:", err);
      }
    },
    onError: (error) => {
      // 실패했을 경우 로직
      console.error("추천 실패:", error);
    },
  });
}
