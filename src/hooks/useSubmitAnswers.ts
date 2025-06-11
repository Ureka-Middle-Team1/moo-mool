// src/hooks/useSubmitAnswers.ts
import { client } from "@/lib/axiosInstance";
import { Answer } from "@/types/answer";
import { useMutation } from "@tanstack/react-query";

type SubmitAnswersBody = {
  userId: string;
  planId: number;
  answers: Answer[];
};

export const useSubmitAnswers = () => {
  return useMutation({
    mutationFn: async (body: SubmitAnswersBody) => {
      const res = await client.post("/meme-test/results", body);
      return res.data;
    },
  });
};
