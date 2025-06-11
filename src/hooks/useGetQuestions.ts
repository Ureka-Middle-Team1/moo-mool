import { useQuery } from "@tanstack/react-query";
import { QuestionsResponse } from "@/types/question";
import { client } from "@/app/lib/axiosInstance";

export const useGetQuestions = () => {
  return useQuery<QuestionsResponse>({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await client.get("/meme-test/questions");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
