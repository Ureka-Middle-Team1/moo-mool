import { useChatStore } from "@/store/useChatStore";
import { useNormalizeAnswerFlow } from "@/hooks/useNormalizeAnswerFlow";

export function useHandleAnswer() {
  const { appendMessage, currentQuestionId } = useChatStore();
  const { normalizeAnswer } = useNormalizeAnswerFlow();

  const handleNormalizedAnswer = (userMessage: string) => {
    appendMessage({ role: "user", content: userMessage });

    normalizeAnswer({
      message: userMessage,
      questionId: currentQuestionId,
    });
  };

  return { handleNormalizedAnswer };
}
