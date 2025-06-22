import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { ChatApiResponse, ParsedPlan } from "@/types/Chat";

// 스마트 초이스로 가져온 것을 바탕으로, 구독제 서비스까지 고려해서 추천을 진행하는 useChatbotRecommendationPlan
export function useGetFinalPlanInChatbot() {
  return useMutation({
    mutationFn: async (input: {
      smartChoicePlans: ParsedPlan[];
      subscribe: string;
    }) => {
      const res = await client.post("/chatbot-plan", input);
      const data = res.data;
      const firstPlan = data.result?.[0];
      return firstPlan ?? null; // 첫번째 "planData" 바로 반환
    },
    retry: 3,
    onError: (error) => {
      console.error("chatbot 추천 실패:", error);
    },
  });
}
