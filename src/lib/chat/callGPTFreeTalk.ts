import { useChatStore } from "@/store/useChatStore";
import { client } from "../axiosInstance";
import { questionTextMap } from "./chatBotQuestionFlow";

type CallGPTFreeTalkResult = {
  message: string;
  triggeredFSM: boolean;
};

// "자연스러운 대화" 흐름을 위한 callGPTFreeTalk
export async function callGPTFreeTalk(
  userMessage: string
): Promise<CallGPTFreeTalkResult> {
  const { setCurrentQuestionId } = useChatStore.getState();

  const body = JSON.stringify({ message: userMessage }); // userMessage를 json 형태로 보내준다
  const res = await client.post("/chat-freetalk", body); // chat-freetalk api로부터 정보를 받아온다
  const reply = res.data?.result?.trim();

  // GPT 응답이 비어 있을 경우에 대해 방어 코드
  if (!reply || typeof reply !== "string") {
    throw new Error("GPT 응답이 비어 있거나 문자열이 아닙니다.");
  }

  if (reply?.toUpperCase() === "FSM") {
    // "정확한 답변" 로직으로 가야 하는 경우
    setCurrentQuestionId(1); // 정확한 추천 흐름 진입
    return {
      message:
        "정확하게 추천하기 위해 챗봇 모드를 변경할게. 혹시, 무제한 요금제를 쓰는 중이야?",
      triggeredFSM: true,
    };
  }

  return { message: reply, triggeredFSM: false };
}
