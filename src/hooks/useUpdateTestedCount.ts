import { client } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ id를 mutate 함수에 전달하게 수정
export const useUpdateTestedCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await client.post("/user/tested-count", { userId: id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
