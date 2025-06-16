import { useFreeTalkStore } from "@/store/useFreeTalkStore";
import { callGPTFreeTalk } from "./callGPTFreeTalk";
import { useChatStore } from "@/store/useChatStore";

// "자연스러운 대화" 흐름에서 GPT 응답에 대해 처리하는 handleFreeTalkAnswer
export async function handleFreeTalkAnswer(
  userMessage: string,
  setCurrentQuestionId: (id: number) => void
): Promise<void> {
  const { appendMessage } = useChatStore.getState();
  const { addMessage } = useFreeTalkStore.getState();

  // 1. 사용자 메시지 추가
  appendMessage({ role: "user", content: userMessage });
  addMessage({ role: "user", content: userMessage });

  // 2. GPT에게 응답 요청
  const { message, triggeredFSM } = await callGPTFreeTalk(userMessage);

  // 3. FSM 분기 트리거가 있을 경우, currentQuestionId를 변경
  if (triggeredFSM) {
    if (message.includes("필드 분석 완료")) {
      // "필드 분석 완료"인 경우
      setCurrentQuestionId(13); // Smart choice API 요청을 위한 트리거
    } else if (message.includes("FSM")) {
      // "정확한 답변" 로직으로 가야 하는 경우
      setCurrentQuestionId(1); // FSM 흐름의 시작 질문으로 진입
    }
    return;
  }

  // 4. GPT의 응답 메시지 출력 (추후, 쿠션 질문을 추가하기 위해서 triggeredFSM을 사용해도 될 듯)
  appendMessage({ role: "bot", content: message });
}
