import { useChatStore } from "@/store/useChatStore";
import { client } from "../axiosInstance";
import { questionTextMap } from "./chatBotQuestionFlow";
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
  const { lastSummary } = useFreeTalkStore.getState();

  const body = JSON.stringify({
    message: userMessage,
    lastSummary: lastSummary,
  }); // userMessage와 lastSummary 정보를 json 형태로 보내준다
  const res = await client.post("/chat-freetalk", body); // chat-freetalk api로부터 정보를 받아온다
  const reply = res.data?.result?.trim();

  // GPT 응답이 비어 있을 경우에 대해 방어 코드
  if (!reply || typeof reply !== "string") {
    throw new Error("GPT 응답이 비어 있거나 문자열이 아닙니다.");
  }

  // 모든 필드 수집 완료 시.. JSON 파싱 → 상태 업데이트
  if (reply.includes("<FIELDS>")) {
    // 답변에 "<FIELDS>" 내용이 포함되어 있을 경우 --> 모든 필드 내용 수집 완료한 경우
    const json = extractJson(reply);
    updateTendency(json); // 전체 필드를 zustand에 업데이트
    return { message: "필드 분석 완료", triggeredFSM: true };
  }

  // "정확한 답변" 로직으로 가야 하는 경우
  if (reply?.toUpperCase() === "FSM") {
    return {
      message: "FSM",
      triggeredFSM: true,
    };
  }

  return { message: reply, triggeredFSM: false };
}
