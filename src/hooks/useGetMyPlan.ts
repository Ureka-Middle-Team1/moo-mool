import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";

interface MyPlanData {
  id: string;
  email: string;
  my_plan: number | null;
  invited_count: number;
  type: string | null;
}

export function useGetMyPlan() {
  return useQuery<MyPlanData, Error>({
    queryKey: ["myPlan"],
    queryFn: async () => {
      const res = await client.get("/user/my-plan");
      return res.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
