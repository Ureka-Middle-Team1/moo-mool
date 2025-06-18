import { client } from "../axiosInstance";
import { useTendencyStore } from "@/store/useTendencyStore";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";

type CallGPTFreeTalkResult = {
  message: string;
  triggeredFSM: boolean;
};

// "자연스러운 대화" 흐름을 위한 callGPTFreeTalk
export async function callGPTFreeTalk(
  userMessage: string
): Promise<CallGPTFreeTalkResult> {
  const { updateTendency } = useTendencyStore.getState();
  const { lastSummary, messages, setLastSummary } = useFreeTalkStore.getState();

  // 최근 10개의 메시지만 사용 (예: 마지막 10개)
  const N = 10;
  const recentMessages = messages
    .slice(-N)
    .filter((m) => m.role === "user" || m.role === "bot")
    .map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.content,
    }));

  const body = JSON.stringify({
    userMessage: userMessage, // 방금 사용자가 입력한 답변
    lastSummary: lastSummary, // 요약 정보 (없으면 null이 저장되어 있을 것임)
    recentMessages: recentMessages, // FreeTalkStore에 저장되어 있는 최근 10개의 메시지 ("bot"을 "assistant로 변경한 형태")
  }); // userMessage와 lastSummary 정보를 json 형태로 보내준다
  const res = await client.post("/chat-freetalk", body); // chat-freetalk api로부터 정보를 받아온다
  const reply = res.data?.result?.trim();

  // GPT 응답이 비어 있을 경우에 대해 방어 코드
  if (!reply || typeof reply !== "string") {
    throw new Error("GPT 응답이 비어 있거나 문자열이 아닙니다.");
  }

  // 특정 필드에 대한 정보가 반영 되었는지, 응답의 정규식으로 확인
  const summaryRegexGlobal =
    /^정리하겠습니다:\s*(voice|data|sms|age|type|dis|subscribe):([A-Z0-9_+]+)(?:\s|$)/gm;

  const safeSummary = lastSummary ?? ""; // lastSummary가 null일 경우에는 공백
  const matches = [...reply.matchAll(summaryRegexGlobal)];

  console.log("매치되는 것: ", matches);

  for (const [, key, value] of matches) {
    const alreadyHas = new RegExp(`(?:^|\\+|,)\\s*${key}:${value}`).test(
      safeSummary
    );
    if (!alreadyHas) {
      updateTendency({ [key]: value });
      const newEntry = `${key}:${value}`;
      const updatedSummary = safeSummary
        ? `${safeSummary}, +${newEntry}`
        : newEntry;
      setLastSummary(updatedSummary);
    }
  }

  // 응답에서 문장만 출력
  const cleanedReply = reply.replace(summaryRegexGlobal, "").trim();

  // "정확한 답변" 로직으로 가야 하는 경우
  if (reply?.toUpperCase() === "FSM") {
    return {
      message: "FSM",
      triggeredFSM: true,
    };
  }

  return { message: cleanedReply, triggeredFSM: false };
}
