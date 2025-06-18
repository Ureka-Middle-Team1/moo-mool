import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { useChatStore } from "@/store/useChatStore";
import { Message } from "@/types/Chat";
import { usePostChatSession } from "./usePostChatSession";

type ChatbotSummaryInput = {
  userId: string;
  messages: Message[]; // 자유 형식
};

// 채팅 다 끝내고, 추천까지 받았을 때, 해당 Hook을 사용해 요약 진행
export const usePostChatbotSummary = () => {
  const { mutate: submitChatSummary } = usePostChatSession();

  return useMutation({
    mutationFn: async ({ userId, messages }: ChatbotSummaryInput) => {
      console.log("채팅 요약 진행 중..");
      const res = await client.post("/chat-summary", {
        messages: JSON.stringify(messages),
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      const summary = data.normalizedValue;
      const { userId, messages } = variables;
      submitChatSummary({ userId, messages, summary });
      console.log("채팅 요약 성공: ", data);
    },
    onError: (error) => {
      console.error("채팅 요약 실패: ", error);
    },
  });
};
