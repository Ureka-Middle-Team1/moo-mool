import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";

export type ChatSession = {
  id: number;
  user_id: string;
  messages: string; // JSON string
  summary: string;
  created_at: string;
};

export const useRecentChatSessions = (userId?: string) => {
  return useQuery<ChatSession[]>({
    queryKey: ["chatSessions", userId],
    queryFn: async () => {
      const res = await client.get(`/api/chat-sessions?userId=${userId}`);
      return res.data;
    },
    enabled: !!userId, // userId 없을 때는 호출 안함
  });
};
