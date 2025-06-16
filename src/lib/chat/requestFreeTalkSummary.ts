import { Message } from "@/types/Chat";
import { client } from "../axiosInstance";

// "자연스러운 대화" 흐름에서는 주기적인 대화 요약 필요 --> 해당 과정 진행하는 requestFreeTalkSummary 메소드
export async function requestFreeTalkSummary(
  messages: Message[],
  lastSummary: string | null
) {
  // 매개변수로 넘겨받은 messages 중에서 content만 추출
  const userContents = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content);

  const res = await client.post<{ summary: string }>("/freetalk-summary", {
    messages: userContents,
    lastSummary: lastSummary,
  });

  return res.data;
}
