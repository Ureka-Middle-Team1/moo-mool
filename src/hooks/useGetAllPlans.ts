import { useQuery } from "@tanstack/react-query";
import { PlanDBApiResponse } from "@/types/PlanData";
import { client } from "@/lib/axiosInstance";

export const useGetAllPlans = () => {
  return useQuery<PlanDBApiResponse[]>({
    queryKey: ["plans", "all"],
    queryFn: async () => {
      const res = await client.get<PlanDBApiResponse[]>("plan/all");
      return res.data;
    },
  });
};
