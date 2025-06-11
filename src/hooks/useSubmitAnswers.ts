// src/hooks/useSubmitAnswers.ts
import { useMutation } from "@tanstack/react-query";
import { Answer } from "@/types/question";
import { client } from "@/app/lib/axiosInstance";

type SubmitAnswersBody = {
  userId: string;
  planId: number;
  answers: Answer[];
};

export const useSubmitAnswers = () => {
  return useMutation({
    mutationFn: async (body: SubmitAnswersBody) => {
      const res = await client.post("/meme-test/submit", body);
      return res.data;
    },
  });
};
