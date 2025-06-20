// src/hooks/useNormalizeAnswer.ts
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axiosInstance";
import { mapTendencyData } from "@/lib/chat/mapTendencyData";
import { getNextQuestionId } from "@/lib/chat/getNextQuestionId";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";
import { useChatStore } from "@/store/useChatStore";
import { useTendencyStore } from "@/store/useTendencyStore";

// 요청 파라미터
type NormalizeParam = {
  message: string;
  questionId: number;
};

// API 응답 타입
interface NormalizeResponse {
  normalizedValue: string;
}

export function useNormalizeAnswerFlow() {
  const { userTendencyInfo, updateTendency } = useTendencyStore();
  const { appendMessage, setCurrentQuestionId } = useChatStore();

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
      if (nextId === -1) {
        // "자연스러운 대화" 모드(nextQuestionId 값으로 -1 받음)로 진입 시엔 다른 로직 필요
        appendMessage({
          role: "bot",
          content:
            "나랑 자연스럽게 대화하고 싶구나! 요금제 추천 관련해서 자연스럽게 물어봐줘~",
        });
        setCurrentQuestionId(nextId); // 현재 questionID를 -1로 설정
      }

      let contentToAppend: string; // useChatStore에 append할 메시지

      if (data.normalizedValue === "INVALID") {
        // 유효하지 않은 답변("INVALID"일 경우에..)일 경우, 재질문 텍스트 추가
        contentToAppend = `다시 물어볼게. ${questionTextMap[questionId]}`;
      } else if (nextId !== undefined) {
        contentToAppend = questionTextMap[nextId];
      } else {
        contentToAppend = questionTextMap[questionId];
      }

      if (contentToAppend !== undefined) {
        // contentToAppend가 undefined가 아닌 경우에만.. (즉, 유효한 경우에만..)
        setTimeout(() => {
          // 사용자 문장 또한 isTyping이 true일 때 콜백 큐에 순차적으로 들어가 실행할 수 있도록, 여기도 setTimeout 해야 함
          appendMessage({ role: "bot", content: contentToAppend }); // appendMessage에 메시지 붙이기
        }, 0);
      }
      if (data.normalizedValue !== "INVALID" && nextId !== undefined) {
        // 유효하지 않은 답변이 아니고, nextId 또한 undefined가 아닐 경우, nextId로 currentQuestionId 갱신
        setCurrentQuestionId(nextId);
      }
    },

    onError: (error) => {
      console.error("에러 사항....: ", error);
      appendMessage({
        role: "bot",
        content: "죄송해요! 뭔가 잘못됐어요. 다시 한 번 입력해 주실 수 있나요?",
      });
    },

    retry: 3,
  });

  return { normalizeAnswer: mutate };
}
