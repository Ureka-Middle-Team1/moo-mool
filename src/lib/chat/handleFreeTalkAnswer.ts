import { callGPTFreeTalk } from "./callGPTFreeTalk";
import { useChatStore } from "@/store/useChatStore";
import { questionTextMap } from "./chatBotQuestionFlow";

// "자연스러운 대화" 흐름에서 GPT 응답에 대해 처리하는 handleFreeTalkAnswer
export async function handleFreeTalkAnswer(userMessage: string): Promise<void> {
  const { appendMessage } = useChatStore.getState();

  // 1. 사용자 메시지 추가
  appendMessage({ role: "user", content: userMessage });

  // 2. GPT에게 응답 요청
  const { message, triggeredFSM } = await callGPTFreeTalk(userMessage);

  // 3. GPT의 응답 메시지 출력 (추후, 쿠션 질문을 추가하기 위해서 triggeredFSM을 사용해도 될 듯)
  appendMessage({ role: "bot", content: message });
}
