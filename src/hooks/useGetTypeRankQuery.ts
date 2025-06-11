import { client } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type Moono = {
  label: string;
  image: string;
  score: number;
};

export type TypeRankResponse = {
  participantCount: number;
  moonos: Moono[];
};

export const useGetTypeRankQuery = () => {
  return useQuery<TypeRankResponse>({
    queryKey: ["type-rank"],
    queryFn: async () => {
      const { data } = await client.get("/meme-test/ranklists");
      return data;
    },
    staleTime: 1000 * 60,
    retry: 2,
  });
};
