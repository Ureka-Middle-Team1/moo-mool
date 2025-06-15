import { client } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useEncryptedUserId = (id: string) => {
  return useQuery({
    queryKey: ["encryptedUserId", id],
    queryFn: async () => {
      const res = await client.get(`/meme-test/encrypt-id?id=${id}`);
      return res.data.encryptedId as string;
    },
    enabled: !!id,
  });
};
