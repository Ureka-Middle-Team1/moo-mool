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
    staleTime: 0,
    retry: 2,
  });
};
