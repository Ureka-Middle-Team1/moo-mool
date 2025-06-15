import { client } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useIncreaseInvitedCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inviterId: string) => {
      const res = await client.post("/user/invited-count", { inviterId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
