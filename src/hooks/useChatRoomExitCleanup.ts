import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChatStore } from "@/store/useChatStore";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";
import { useTendencyStore } from "@/store/useTendencyStore";

// '/chat'이 아닌 다른 url로 이동할 때 localStorage를 cleanup 하는 Hook
export function useChatRoomExitCleanup() {
  const pathname = usePathname();

  const {
    setCurrentQuestionId,
    setHasRecommended,
    clearMessages,
    setChatSummary,
    hasRecommended,
  } = useChatStore();
  const { clear } = useFreeTalkStore();
  const { resetTendency } = useTendencyStore();

  useEffect(() => {
    if (pathname !== "/chat" && hasRecommended) {
      // '/chat' 페이지를 벗어났을 때만 초기화 + 추천 받은 상태일 경우에만 수행해야 함
      setCurrentQuestionId(0);
      setHasRecommended(false);
      clearMessages();
      setChatSummary("");
      clear();
      resetTendency();
    }
  }, [pathname]);
}
