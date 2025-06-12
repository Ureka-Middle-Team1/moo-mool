import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";

interface Benefit {
  imageSrc: string;
  title: string;
  description: string;
}

interface TendencyPlanResponse {
  name: string;
  price: string;
  tags: string[];
  radar: number[];
  bar: number[];
  compare: number[];
  benefits: Benefit[];
}

export const useGetTendencyPlanQuery = (): UseQueryResult<
  TendencyPlanResponse,
  Error
> => {
  return useQuery<TendencyPlanResponse, Error>({
    queryKey: ["tendency-plan"],
    queryFn: async () => {
      const res = await client.get("/tendency");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, //5분 캐싱 유지
  });
};
