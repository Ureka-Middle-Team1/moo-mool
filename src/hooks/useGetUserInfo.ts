import { client } from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await client.get(`/user?id=${id}`);
      return data.user;
    },
    enabled: !!id,
  });
};
