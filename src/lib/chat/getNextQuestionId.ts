// src/lib/getNextQuestionId.ts
import { questionFlow } from "@/lib/chat/chatBotQuestionFlow";

// 다음 질문이 무엇인지 questionId를 가져오는 function
export function getNextQuestionId(
  questionId: number,
  normalized: string
): number | undefined {
  const flow = questionFlow[questionId];

  // 수치형 답변인 경우
  if (/^[0-9]+$/.test(normalized)) {
    return flow["__NUMERIC__"] ?? flow["INVALID"];
  }

  return flow[normalized] ?? flow["__DEFAULT__"]; // 12번 질문에 대해서 이것이 유용히 사용될 것임
}
