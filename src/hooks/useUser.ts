import { client } from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await client.get(`/user?id=${id}`);
      return data.user;
    },
    enabled: !!id,
    staleTime: 0, // 캐시를 바로 오래된 걸로 판단하고, 항상 서버 요청 시도
    refetchOnMount: "always", // 컴포넌트 마운트 시 무조건 refetch
    refetchOnWindowFocus: false,
  });
};
