import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { Message } from "@/types/Chat";
import { usePostChatSession } from "./usePostChatSession";
import { useChatStore } from "@/store/useChatStore";

type ChatbotSummaryInput = {
  userId: string;
  messages: Message[]; // 자유 형식
};

// 채팅 다 끝내고, 추천까지 받았을 때, 해당 Hook을 사용해 요약 진행
export const usePostChatbotSummary = () => {
  const { mutate: submitChatSummary } = usePostChatSession();
  const { getLastBotMessage } = useChatStore.getState(); // 리렌더링 필요 X, 대화 내역 마지막 질문만 받아오면 됨, 그리고 그것은 요금제 추천 정보임

  return useMutation({
    mutationFn: async ({ messages }: ChatbotSummaryInput) => {
      const res = await client.post(
        "/chat-summary",
        {
          messages: JSON.stringify(messages),
        },
        {
          headers: {
            "Content-Type": "application/json", // 명시적으로 지정
          },
        }
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      const summary = data.normalizedValue;
      const planId = getLastBotMessage()?.planData?.id; // 대화를 끝냈다면, 맨 마지막 "bot" 대화는 planData를 무조건 포함하고 있음
      const { userId, messages } = variables;
      console.log("채팅 요약 성공: ", data, userId);
      submitChatSummary({ userId, messages, summary, planId });
    },
    onError: (error) => {
      console.error("채팅 요약 실패: ", error);
    },
  });
};
