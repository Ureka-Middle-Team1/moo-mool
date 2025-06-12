import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { PlanDetailData } from "@/types/planDetail";

export async function fetchPlanDetail(): Promise<PlanDetailData> {
  const response = await client.get("/plandetail");
  if (!response.data.success) {
    throw new Error("데이터 로드 실패");
  }
  return response.data;
}

export function useGetPlanDetailQuery() {
  return useQuery({
    queryKey: ["planDetail"],
    queryFn: fetchPlanDetail,
  });
}
