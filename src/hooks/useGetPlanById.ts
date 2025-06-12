// hooks/usePlanById.ts
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@prisma/client";
import { client } from "@/lib/axiosInstance";

export const useGetPlanById = (id: number | undefined) => {
  return useQuery<Plan, Error>({
    queryKey: ["plan", id],
    queryFn: async () => {
      if (id === undefined) throw new Error("ID가 없습니다");
      const res = await client.get<Plan>(`/plan/id/${id}`);
      console.log(res.data);
      return res.data;
    },
    enabled: id !== undefined,
  });
};
