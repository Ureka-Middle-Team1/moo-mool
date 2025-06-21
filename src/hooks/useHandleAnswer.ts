import { useChatStore } from "@/store/useChatStore";
import { useNormalizeAnswerFlow } from "@/hooks/useNormalizeAnswerFlow";

export function useHandleAnswer() {
  const { appendMessage, currentQuestionId, isTyping, setIsTyping } =
    useChatStore();
  const { normalizeAnswer } = useNormalizeAnswerFlow();

  const handleNormalizedAnswer = (userMessage: string) => {
    // 타이핑으로 입력한 경우엔, 애니메이션 전환의 자연스러움을 위해 따로 처리해야 한다
    if (isTyping) {
      setIsTyping(false); // 타이핑 상태 false로 만든다
      // exit 애니메이션 여유 시간 확보 (200~250ms)
      setTimeout(() => {
        appendMessage({ role: "user", content: userMessage });
      }, 200);
    } else {
      // quickReply 등으로 답변한 경우, 채팅 말풍성 나오는 데 지연시간 있으면 UX 저하
      appendMessage({ role: "user", content: userMessage });
    }

    // 사용자 답변(userMessage)에 대해 정규화를 진행한다
    normalizeAnswer({
      message: userMessage,
      questionId: currentQuestionId,
    });
  };

  return { handleNormalizedAnswer };
}
