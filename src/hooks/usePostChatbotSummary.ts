import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { Message } from "@/types/Chat";
import { useChatStore } from "@/store/useChatStore";

type ChatbotSummaryInput = {
  messages: Message[]; // 자유 형식
};

// 채팅 다 끝내고, 추천까지 받았을 때, 해당 Hook을 사용해 요약 진행
export const usePostChatbotSummary = () => {
  const { setChatSummary } = useChatStore();

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

      const summary = res.data.normalizedValue;
      setChatSummary(summary); // chatStore의 summary 내용을 업데이트 (요약을 요금제 추천 카드 뜨기 전에 하기 위함)
    },
  });
};
