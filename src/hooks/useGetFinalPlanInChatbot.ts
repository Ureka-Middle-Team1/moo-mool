import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { ChatApiResponse, ParsedPlan } from "@/types/Chat";

type Options = {
  onSuccess?: (data: ChatApiResponse) => void;
};

// 스마트 초이스로 가져온 것을 바탕으로, 구독제 서비스까지 고려해서 추천을 진행하는 useChatbotRecommendationPlan
export function useGetFinalPlanInChatbot(options?: Options) {
  return useMutation({
    mutationFn: (input: {
      smartChoicePlans: ParsedPlan[];
      subscribe: string;
    }) => client.post("/chatbot-plan", input).then((res) => res.data),
    retry: 3,
    onSuccess: (data) => {
      options?.onSuccess?.(data); // 이 부분이 빠졌다면 의도대로 작동하지 않음!
    },
    onError: (error) => {
      console.error("chatbot 추천 실패:", error);
    },
  });
}
