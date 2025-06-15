import { useChatStore } from "@/store/useChatStore";
import { useNormalizeAnswerFlow } from "@/hooks/useNormalizeAnswerFlow";

export function useHandleAnswer() {
  const { appendMessage, currentQuestionId } = useChatStore();
  const { normalizeAnswer } = useNormalizeAnswerFlow();

  const handleNormalizedAnswer = (userMessage: string) => {
    appendMessage({ role: "user", content: userMessage });

    // 사용자 답변(userMessage)에 대해 정규화를 진행한다
    normalizeAnswer({
      message: userMessage,
      questionId: currentQuestionId,
    });
  };

  return { handleNormalizedAnswer };
}
