import { calculateSmartChoiceValues } from "@/lib/memeTestRecommend/calculateSmartChoiceValues";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { getUserMemeProfile } from "@/lib/memeTestRecommend/getUserMemeProfile";
import { useSmartChoiceRecommendation } from "./useSmartChoiceRecommendation";
import { useEffect } from "react";

// 밈테스트 결과를 이용해서 Smart Choice API request body 형태로 변환한 다음, 요청을 받아오는 Hook
export function useGetSixTypeRecommendPlan() {
  const { data: session, status } = useSession();
  const { mutate: smartChoiceRecommend } = useSmartChoiceRecommendation();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id) throw new Error("로그인 정보가 없습니다");

      const memeTestResult = await getUserMemeProfile(session.user.id); // 1. 밈테스트 정보 받아오기
      const { call, sms, data } = calculateSmartChoiceValues(memeTestResult); // 2. 스마트 초이스용 응답으로 변환

      const smartChoiceRequestBody: SmartChoiceApiInput = {
        voice: call,
        sms: sms,
        data: data,
        age: "20", // "default" 값으로 "성인"
        type: "6", // "default" 값으로 "5G"
        dis: "24", // "default" 값으로 "24개월 약정"
      };

      smartChoiceRecommend(smartChoiceRequestBody); // 3. 이것을 통해, chat-storage에 정보 하나 저장
    },
    onError: (error) => {
      console.error("에러 발생, ", error);
    },
  });

  // 로딩 초기에는 session이 undefined 상태 --> status를 보고 업뎃 한 번 해줘야 한다
  useEffect(() => {
    if (status === "authenticated") {
      mutation.mutate();
    }
  }, [status]);

  return mutation;
}
