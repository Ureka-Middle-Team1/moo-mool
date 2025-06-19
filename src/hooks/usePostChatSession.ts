import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { Message } from "@/types/Chat";

type CreateSessionInput = {
  userId: string;
  messages: Message[];
  summary: string;
};

export const usePostChatSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, messages, summary }: CreateSessionInput) => {
      console.log("chat session post");
      const res = await client.post("/chat-session", {
        userId,
        messages,
        summary,
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
