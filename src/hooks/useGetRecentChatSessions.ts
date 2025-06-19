import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";

export type ChatSession = {
  id: number;
  user_id: string;
  messages: string; // JSON string
  summary: string;
  created_at: string;
  name: string; // 통신요금 이름
};

export const useGetRecentChatSessions = (userId?: string) => {
  return useQuery<ChatSession[]>({
    queryKey: ["chatSessions", userId],
    queryFn: async () => {
      const res = await client.get(`/chat-session?userId=${userId}`);
      return res.data;
    },
    enabled: !!userId, // userId 없을 때는 호출 안함
  });
};
