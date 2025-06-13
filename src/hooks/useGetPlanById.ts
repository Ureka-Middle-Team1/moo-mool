import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { PlanApiResponse } from "@/types/Plan";

export const useGetPlanById = (id: number | undefined) => {
  return useQuery<PlanApiResponse, Error>({
    queryKey: ["plan", id],
    queryFn: async () => {
      if (id === undefined) throw new Error("ID가 없습니다");
      const res = await client.get<PlanApiResponse>(`/plan/id/${id}`);
      return res.data;
    },
    enabled: id !== undefined,
  });
};
