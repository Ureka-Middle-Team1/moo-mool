import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { parsePlans, PlanApiResponse } from "@/types/Chat";
import { useGetFinalPlanInChatbot } from "./useGetFinalPlanInChatbot";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";

type Options = {
  onSuccess?: (data: PlanApiResponse) => void;
};

// 스마트 초이스에서 응답을 받아오는 useSmartChoiceRecommendation
export function useSmartChoiceRecommendation(options?: Options) {
  const { userTendencyInfo } = useTendencyStore();
  const { setRecommendedPlanId } = useChatStore();
  const addMessage = useChatStore((state) => state.appendMessage);

  // 구독 서비스까지 포함해서 추천을 수행
  const { mutate: getFinalPlanInChatbot } = useGetFinalPlanInChatbot({
    // 스마트 초이스로 가져온 거..
    onSuccess: (data) => {
      if (data.result!.length > 0) {
        addMessage({
          role: "bot",
          content: "너에게 딱맞는 요금제 추천해줄게!",
          type: "plan",
          planData: data.result![0],
        });
        setRecommendedPlanId(data.result![0].id); // chatStore에 저장되어 있는 "추천된 요금제 id" 정보 업데이트
      }
    },
  });

  return useMutation({
    mutationFn: async (input: SmartChoiceApiInput) => {
      const res = await client.post("/smartchoice", input); // smart choice 호출
      const parsed = parsePlans(res.data);
      await getFinalPlanInChatbot({
        // subscribe(구독) 정보까지 고려해서 DB를 통해 요금제 정보를 찾아온다
        smartChoicePlans: parsed,
        subscribe: userTendencyInfo.subscribe,
      });
      return;
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
