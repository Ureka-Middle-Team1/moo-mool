// hooks/usePostMyPlan.ts
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";

interface SetMyPlanPayload {
  planId: number;
}

export function usePostMyPlan() {
  return useMutation({
    mutationFn: ({ planId }: SetMyPlanPayload) =>
      client.post("/user/set-my-plan", { planId }),
  });
}
