import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/${userId}`);
      return data.user;
    },
    enabled: !!userId,
  });
};
