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
    staleTime: 1000 * 60 * 5, // 5분 캐시

    //  조건부 재시도 설정
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;

      // 404: 존재하지 않음 → 재시도하지 않음
      if (status === 404) return false;

      // 그 외 (500, 502 등): 최대 2번까지 재시도
      return failureCount < 2;
    },
  });
};
