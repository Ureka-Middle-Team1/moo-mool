// src/hooks/useNormalizeAnswer.ts
import { useMutation } from "@tanstack/react-query";
import { client } from "@app/lib/axiosInstance";

type normalizeParam = {
  message: string;
  questionId: number;
};

// 사용자 응답을 정규화하는 useNormalizeAnswer
export function useNormalizeAnswer() {
  return useMutation({
    mutationFn: (input: normalizeParam) =>
      client.post("/normalizeUserPrompt", input).then((res) => res.data),
    retry: 3, // 최대 3회까지 재시도
    onSuccess: (data) => {
      // 성공했을 경우 로직
      console.log("사용자 응답 정규화 성공", data);
    },
    onError: (error) => {
      // 실패했을 경우 로직
      console.error("사용자 응답 정규화 실패", error);
    },
  });
}
