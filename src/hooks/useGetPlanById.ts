import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { PlanDBApiResponse } from "@/types/PlanData";

export const useGetPlanById = (id: number | undefined) => {
  return useQuery<PlanDBApiResponse, Error>({
    queryKey: ["plan", id],
    queryFn: async () => {
      if (id === undefined) throw new Error("ID가 없습니다");
      const res = await client.get<PlanDBApiResponse>(`/plan/id/${id}`);
      console.log(res.data);
      return res.data;
    },
    enabled: id != null,
  });
};
