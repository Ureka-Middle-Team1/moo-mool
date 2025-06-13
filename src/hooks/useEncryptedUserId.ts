import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEncryptedUserId = (id: string) => {
  console.log("훅에서의 id : ", id);
  return useQuery({
    queryKey: ["encryptedUserId", id],
    queryFn: async () => {
      const res = await axios.get(`/api/meme-test/encrypt-id?id=${id}`);
      return res.data.encryptedId as string;
    },
    enabled: !!id,
  });
};
