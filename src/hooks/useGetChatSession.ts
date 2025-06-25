import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { AxiosError } from "axios";

// Chat Session을 불러오는 Hook
export const useGetChatSession = (sessionId: number | null) => {
  return useQuery({
    queryKey: ["chatSession", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("세션 ID가 필요합니다.");
      console.log(sessionId);
      const res = await client.get(`/chat-session/${sessionId}`);
      return res.data;
    },
    enabled: !!sessionId, // sessionId가 있을 때만 실행
  });
};
