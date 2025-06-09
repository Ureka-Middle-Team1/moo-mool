import { useMutation } from "@tanstack/react-query";
import axios from "@/app/lib/axiosInstance";
import { RecommendationInput } from "@type/recommendation";

// post 요청에 대해서는 useMutation()을 사용하는 것이 적합
export function useRecommendationPlan() {
  return useMutation({
    mutationFn: (input: RecommendationInput) =>
      axios.post("/smartchoice", input).then((res) => res.data),
    retry: 3, // 최대 3회까지 재시도
  });
}
