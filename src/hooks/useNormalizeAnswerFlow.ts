// src/hooks/useNormalizeAnswer.ts
import { useMutation } from "@tanstack/react-query";
import { client } from "@app/lib/axiosInstance";
import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";
import { Message } from "@/types/Message";
import { mapTendencyData } from "@/lib/chat/mapTendencyData";
import { getNextQuestionId } from "@/lib/chat/getNextQuestionId";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";

// 요청 파라미터
type NormalizeParam = {
  message: string;
  questionId: number;
};

// API 응답 타입
interface NormalizeResponse {
  normalizedValue: string;
}

// 훅 외부에서 넘길 setter들 정의
interface UseNormalizeAnswerArgs {
  setCurrentQuestionId: (id: number) => void;
  userTendencyInfo: SmartChoiceApiInput;
  updateTendency: (patch: Partial<SmartChoiceApiInput>) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

// 커스텀 훅 정의
export function useNormalizeAnswerFlow({
  setCurrentQuestionId,
  userTendencyInfo,
  updateTendency,
  setMessages,
}: UseNormalizeAnswerArgs) {
  const { mutate } = useMutation<NormalizeResponse, Error, NormalizeParam>({
    mutationFn: (input) =>
      client.post("/normalized-prompts", input).then((res) => res.data),

    onSuccess: (data, variables) => {
      const { questionId } = variables;

      const patch = mapTendencyData(
        questionId,
        data.normalizedValue,
        userTendencyInfo
      );
      updateTendency(patch);

      const nextId = getNextQuestionId(questionId, data.normalizedValue);

      if (nextId !== undefined && data.normalizedValue !== "INVALID") {
        setCurrentQuestionId(nextId);
        const nextQuestion = questionTextMap[nextId];
        if (nextQuestion) {
          setMessages((prev) => [
            ...prev,
            { role: "bot", content: nextQuestion },
          ]);
        }
      } else {
        const sameQuestion = questionTextMap[questionId];
        if (sameQuestion) {
          setMessages((prev) => [
            ...prev,
            { role: "bot", content: sameQuestion },
          ]);
        }
      }
    },

    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "죄송해요! 뭔가 잘못됐어요. 다시 한 번 입력해 주실 수 있나요?",
        },
      ]);
    },

    retry: 3,
  });

  return { mutate };
}
