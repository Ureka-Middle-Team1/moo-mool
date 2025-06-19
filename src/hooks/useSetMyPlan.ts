import { useState } from "react";
import { client } from "@/lib/axiosInstance";

export function useSetMyPlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function savePlan(planId: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post("/user/set-my-plan", { planId });
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, savePlan };
}
