import { client } from "@/lib/axiosInstance";
import { MemeType } from "@/store/memeTypeData";
import { useQuery } from "@tanstack/react-query";

export type Moono = {
  type: MemeType;
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
};

export const useGetTypeRankQuery = (enabled: boolean = true) => {
  return useQuery<TypeRankResponse>({
    queryKey: ["type-rank"],
    queryFn: async () => {
      const { data } = await client.get("/meme-test/ranklists");
      return data;
    },
    enabled,
    staleTime: 0,
    retry: 2,
    refetchOnMount: "always", // 컴포넌트 마운트 시 항상 refetch
    refetchOnWindowFocus: false,
  });
};
