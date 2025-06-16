import { useMutation } from "@tanstack/react-query";
import { Message } from "@/types/Chat";
import { requestFreeTalkSummary } from "@/lib/chat/requestFreeTalkSummary";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";

// 요약 API 호출 및 사용을 위한 useFreeTalkSummary Hook
export function useFreeTalkSummary(onSuccess?: (summary: string) => void) {
  const { setLastSummary, resetUserMessageCount, clear } =
    useFreeTalkStore.getState();
  return useMutation({
    mutationFn: ({
      lastSummary,
      messages,
    }: {
      lastSummary: string | null;
      messages: Message[];
    }) => requestFreeTalkSummary(messages, lastSummary),
    onSuccess: (data) => {
      setLastSummary(data.summary); // 요약된 것으로 lastSummary 업데이트
      resetUserMessageCount(); // 사용자 응답 count 초기화
      clear(); // FreeTalkStore에 저장되어 있는 메시지 초기화 (더 이상 요약 대상이 아니니까!)
      onSuccess?.(data.summary);
    },
  });
}
