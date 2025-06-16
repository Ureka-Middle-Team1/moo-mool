import { useQuery } from "@tanstack/react-query";
import { UserMemeTestResult } from "@/types/CalculateInMemeTest";
import { client } from "@/lib/axiosInstance";

export const useGetUserCharacterProfile = (userId: string) => {
  return useQuery<UserMemeTestResult>({
    queryKey: ["userCharacterProfile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await client.get(`/user-character-profile/${userId}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    retry: 2,
  });
};
