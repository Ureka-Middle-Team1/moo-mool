import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { Message } from "@/types/Chat";
import { usePostChatSession } from "./usePostChatSession";
import { useChatStore } from "@/store/useChatStore";

type ChatbotSummaryInput = {
  userId: string;
  messages: Message[]; // 자유 형식
  planId: number;
};

// 채팅 다 끝내고, 추천까지 받았을 때, 해당 Hook을 사용해 요약 진행
export const usePostChatbotSummary = () => {
  const { mutate: submitChatSummary } = usePostChatSession();
  const { setChatSummary } = useChatStore();

  return useMutation({
    mutationFn: async ({ messages, userId, planId }: ChatbotSummaryInput) => {
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

      submitChatSummary({ userId, messages, summary, planId });

      return { planId, summary };
    },
    onSuccess: (data) => {
      console.log("채팅 요약 및 저장 성공: ", data.planId, data.summary);
    },
    onError: (error) => {
      console.error("채팅 요약 실패: ", error);
    },
  });
};
