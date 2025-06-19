import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MyPlanResponse {
  id: string;
  email: string;
  my_plan: number | null;
  invited_count: number;
  type: string | null;
}

export function useGetMyPlan() {
  return useQuery<MyPlanResponse>({
    queryKey: ["myPlan"],
    queryFn: async () => {
      const response = await axios.get("/api/user/my-plan");
      return response.data;
    },
    staleTime: 1000 * 60 * 3, // 3분
  });
}
