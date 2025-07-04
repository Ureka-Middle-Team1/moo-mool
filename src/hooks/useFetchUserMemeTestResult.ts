import { useQuery } from "@tanstack/react-query";
import { UserMemeTestResult } from "@/types/CalculateInMemeTest";
import { client } from "@/lib/axiosInstance";
import { calculateSmartChoiceValues } from "@/lib/memeTestRecommend/calculateSmartChoiceValues";

// 밈테스트로 분석된 사용자 정보를 DB로부터 가져오는 Hook
export function useFetchUserMemeTestResult(user_id: string) {
  return useQuery({
    queryKey: ["userMemeTest", user_id],
    queryFn: async (): Promise<UserMemeTestResult> => {
      const res = await client.get(`/meme-test/userprofile?user_id=${user_id}`);
      return res.data; // { call_level, sms_level, ... } 형태를 UserMemeTestResult로 사용
    },
    enabled: !!user_id, // user_id가 있을 때만 요청
  });
}
