import { useQuery } from "@tanstack/react-query";
import { PlanDBApiResponse } from "@/types/PlanData";

export function useGetTopRecommendedPlans() {
  return useQuery<PlanDBApiResponse[]>({
    queryKey: ["topRecommendedPlans"],
    queryFn: async () => {
      const res = await fetch("/api/plan/top-recommended");

      if (!res.ok) {
        throw new Error("Failed to fetch top recommended plans");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
}
