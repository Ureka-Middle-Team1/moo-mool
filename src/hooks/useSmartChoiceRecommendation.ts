import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { PlanApiResponse } from "@/types/Chat";

type Options = {
  onSuccess?: (data: PlanApiResponse) => void;
};

// 스마트 초이스에서 응답을 받아오는 useSmartChoiceRecommendation
export function useSmartChoiceRecommendation(options?: Options) {
  return useMutation({
    mutationFn: (input: SmartChoiceApiInput) =>
      client.post("/smartchoice", input).then((res) => res.data),
    retry: 3, // 최대 3회까지 재시도
    onSuccess: (data) => {
      // 성공했을 경우 로직
      options?.onSuccess?.(data);
      console.log("스마트 초이스 요금제 추천 결과:", data);
    },
    onError: (error) => {
      // 실패했을 경우 로직
      console.error("추천 실패:", error);
    },
  });
}
