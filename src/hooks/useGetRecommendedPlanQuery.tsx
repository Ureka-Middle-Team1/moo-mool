import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "@/app/lib/axiosInstance";
import { AxiosError } from "axios";

export interface Plan {
  rank: number;
  title: string;
  subtitle: string;
  detail: string;
}

export const useGetRecommendedPlanQuery = (): UseQueryResult<
  Plan[],
  AxiosError
> => {
  return useQuery<Plan[], AxiosError>({
    queryKey: ["recommended-plan"],
    queryFn: async () => {
      const { data } = await client.get("/plan/recommend");
      return data;
    },
    staleTime: 1000 * 60,
    retry: 2,
  });
};
