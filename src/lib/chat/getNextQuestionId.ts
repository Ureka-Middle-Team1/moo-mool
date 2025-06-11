// src/lib/getNextQuestionId.ts
import { questionFlow } from "@/lib/chat/chatBotQuestionFlow";

// 다음 질문이 무엇인지 questionId를 가져오는 function
export function getNextQuestionId(
  questionId: number,
  normalized: string
): number | undefined {
  if (/^[0-9]+$/.test(normalized)) {
    // 수치형 답변일 경우
    return questionFlow[questionId]["__NUMERIC__"];
  }
  return questionFlow[questionId]?.[normalized];
}
