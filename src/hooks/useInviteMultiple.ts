import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";

interface InviteParams {
  inviterId: string;
  count: number;
}

export const useInviteMultiple = () => {
  return useMutation({
    mutationFn: async ({ inviterId, count }: InviteParams) => {
      const res = await client.post("/user/invite-multiple", {
        inviterId,
        count,
      });
      return res.data;
    },
  });
};
