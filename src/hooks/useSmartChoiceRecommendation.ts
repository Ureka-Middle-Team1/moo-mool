import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { parsePlans, PlanApiResponse } from "@/types/Chat";
import { useGetFinalPlanInChatbot } from "./useGetFinalPlanInChatbot";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";

// 스마트 초이스에서 응답을 받아오는 useSmartChoiceRecommendation
export function useSmartChoiceRecommendation() {
  const { userTendencyInfo } = useTendencyStore();
  const { setRecommendedPlanId } = useChatStore();
  const addMessage = useChatStore((state) => state.appendMessage);

  // 구독 서비스까지 포함해서 추천을 수행
  const { mutateAsync: getFinalPlanInChatbot } = useGetFinalPlanInChatbot();

  return useMutation({
    mutationFn: async (input: SmartChoiceApiInput) => {
      const res = await client.post("/smartchoice", input); // smart choice 호출
      const parsed = parsePlans(res.data);

      const planData = await getFinalPlanInChatbot({
        // subscribe(구독) 정보까지 고려해서 DB를 통해 요금제 정보를 찾아온다
        smartChoicePlans: parsed,
        subscribe: userTendencyInfo.subscribe,
      });

      if (!planData) throw new Error("추천된 요금제가 없습니다."); // planData가 존재하지 않다면..

      setRecommendedPlanId(planData.id);
      addMessage({
        role: "bot",
        content: "너에게 딱맞는 요금제 추천해줄게!",
        type: "plan",
        planData,
      });

      return planData.id; // mutation이 planId를 반환하게 함
    },
    retry: 3, // 최대 3회까지 재시도
    onSuccess: () => {
      console.log("추천 과정 모두 성공");
    },
    onError: (error) => {
      // 실패했을 경우 로직
      console.error("추천 실패:", error);
    },
  });
}
