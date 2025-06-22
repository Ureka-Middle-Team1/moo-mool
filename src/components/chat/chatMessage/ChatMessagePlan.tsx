import PlanListCard from "@/components/planList/PlanListCard";
import TypingMessage from "../TypingMessage";
import { convertToPlanDBApiResponse } from "@/utils/planDataConverter";
import { ParsedPlanWithID } from "@/types/Chat"; // 필요한 타입에 맞게 수정

type ChatMessagePlanInput = {
  content: string;
  planData: ParsedPlanWithID;
};

// 요금제 추천 카드 응답
export default function ChatMessagePlan({
  content,
  planData,
}: ChatMessagePlanInput) {
  return (
    <div className="flex items-start justify-start gap-2 py-2">
      <img
        src="/assets/moono/chatbot-moono.png"
        alt="무너"
        className="mt-1 h-8 w-8 rounded-full"
      />
      <div className="flex flex-col">
        <span className="mb-1 text-xs text-gray-800">무너</span>
        {content.trim() !== "" && <TypingMessage fullText={content} />}
        <div className="flex w-full flex-col py-3">
          <PlanListCard plan={convertToPlanDBApiResponse(planData)} />
        </div>
      </div>
    </div>
  );
}
