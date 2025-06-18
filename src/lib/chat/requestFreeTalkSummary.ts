import { Message } from "@/types/Chat";
import { client } from "../axiosInstance";

// "자연스러운 대화" 흐름에서는 주기적인 대화 요약 필요 --> 해당 과정 진행하는 requestFreeTalkSummary 메소드
export async function requestFreeTalkSummary(
  messages: Message[],
  lastSummary: string | null
) {
  // 매개변수로 넘겨받은 messages 모두를 추출(gpt는 "bot"보다는 "assistant"를 더 잘 알아들으므로 아래와 같이 수정)
  const fullMessages = messages.map((m) => ({
    role: m.role === "bot" ? "assistant" : m.role, // GPT 기준 role로 정규화
    content: m.content,
  }));

  // 요약을 위한 api 호출
  const res = await client.post<{ summary: string }>("/chat-freetalk-summary", {
    messages: fullMessages,
    lastSummary: lastSummary,
  });

  return res.data;
}
