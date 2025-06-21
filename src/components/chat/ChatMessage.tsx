"use client";

import { Message } from "@/types/Chat";
import PlanListCard from "@/components/planList/PlanListCard";
import TypingMessage from "./TypingMessage";
import { motion } from "framer-motion";
import { convertToPlanDBApiResponse } from "@/utils/planDataConverter";

interface ChatMessageProps {
  message: Message;
  isLastBotMessage?: boolean;
  isTyping?: boolean;
}

export default function ChatMessage({
  message,
  isLastBotMessage,
  isTyping = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  // "입력 중"인 상태 버전
  if (isTyping) {
    return (
      <motion.div
        key="typing"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        layout
        className="mb-3 flex items-start justify-end gap-2">
        <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-5 py-3 text-sm shadow-md">
          <div className="flex gap-1">
            {[0, 0.2, 0.4].map((delay, idx) => (
              <motion.span
                key={idx}
                className="h-2 w-2 rounded-full bg-black"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // 최종 요금제 카드 추천 버전
  if (message.type === "plan" && message.planData) {
    return (
      <div className="flex items-start justify-start gap-2 py-2">
        <img
          src="/assets/moono/chatbot-moono.png"
          alt="무너"
          className="mt-1 h-8 w-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="mb-1 text-xs text-gray-800">무너</span>
          {message.content.trim() !== "" && ( // type이 "plan"인 메시지에 대해 content가 비어 있다면 TypeMessage 출력 X
            <TypingMessage fullText={message.content} />
          )}
          <div className="flex w-full flex-col py-3">
            <PlanListCard plan={convertToPlanDBApiResponse(message.planData)} />
          </div>
        </div>
      </div>
    );
  }

  // 사용자 답변 버전
  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2">
        <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-3 py-2 text-sm shadow-md">
          {message.content}
        </div>
      </div>
    );
  }

  // 무너 질문 버전
  return (
    <div className="flex items-start justify-start gap-2">
      <img
        src="/assets/moono/chatbot-moono.png"
        alt="무너"
        className="mt-1 h-8 w-8 rounded-full"
      />
      <div className="flex flex-col">
        <span className="mb-1 text-xs text-gray-800">무너</span>
        {isLastBotMessage ? (
          <>
            <TypingMessage fullText={message.content} />
          </>
        ) : (
          <div className="max-w-[75%] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm shadow-md">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
