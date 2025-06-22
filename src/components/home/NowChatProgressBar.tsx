import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const stepKeywords: { [key: number]: string } = {
  1: "unlimited",
  2: "streaming",
  3: "need",
  4: "data",
  5: "shortage",
  6: "wifi",
  7: "call/sms",
  8: "age",
  9: "network",
  10: "contract",
  11: "subscription",
};

// 카드에 들어가는 진행상황 Bar (ChatStore의 message 길이가 2 이상인 경우에만 나타남)
export function NowChatProgressBar({
  currentQuestionId,
  totalSteps = 11,
}: {
  currentQuestionId: number;
  totalSteps?: number;
}) {
  const progress =
    currentQuestionId === -1 // "자연스러운 대화 모드"일 경우, 그냥 progressbar가 절반 정도 차있도록 강제
      ? 0.5
      : Math.max(0, Math.min((currentQuestionId - 1) / (totalSteps - 1), 1));

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-2 h-2 w-full cursor-help rounded-full bg-gray-200">
            <motion.div
              className="h-2 rounded-full bg-[#F5E182]"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="rounded-md bg-gray-800 px-2 py-1 text-xs text-white">
          현재 단계: {stepKeywords[currentQuestionId] || "미정"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
