import { client } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ 밈테스트 결과를 저장할 때 inviterId가 있다면 초대한 사용자의 invited_count도 함께 증가시킴
export const useUpdateTestedCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await client.post("/user/tested-count", { userId: id });

      const inviterId = localStorage.getItem("inviterId");
      if (inviterId) {
        await client.post("/user/invited-count", {
          inviterId,
        });
        localStorage.removeItem("inviterId"); // 중복 증가 방지 위해 제거
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
