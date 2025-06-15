import { client } from "@/lib/axiosInstance";
import { MemeType } from "@/store/memeTypeData";
import { useQuery } from "@tanstack/react-query";

export type Moono = {
  type: string;
  label: string;
  image: string;
  score: number;
  percent: number;
};

export type TypeRankResponse = {
  shareCount: number;
  participantCount: number;
  sharedCount: number;
  moonos: Moono[];
  percent: Record<string, number>;
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
