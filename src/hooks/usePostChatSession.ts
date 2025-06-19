import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { Message } from "@/types/Chat";

type CreateSessionInput = {
  userId: string;
  planId: number | undefined;
  messages: Message[];
  summary: string;
};

// 종료된 대화 내역을 DB에 저장하는 usePostChatSession
export const usePostChatSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      messages,
      summary,
      planId,
    }: CreateSessionInput) => {
      console.log("chat session post");
      const res = await client.post("/chat-session", {
        userId,
        messages,
        summary,
        planId,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      console.log("chat session post 성공");
      // 캐시 무효화 (최신 5개 세션 다시 불러오기)
      queryClient.invalidateQueries({
        queryKey: ["chatSessions", variables.userId],
      });
    },
  });
};
