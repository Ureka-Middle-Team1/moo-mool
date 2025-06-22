"use client";

import { Message } from "@/types/Chat";
import ChatMessageTyping from "./ChatMessageTyping";
import ChatMessageUser from "./ChatMessageUser";
import ChatMessageBot from "./ChatMessageBot";
import ChatMessagePlan from "./ChatMessagePlan";

interface ChatMessageProps {
  message: Message;
  isLastBotMessage?: boolean;
  isTyping?: boolean;
}

export default function ChatMessage({
  message,
  isLastBotMessage = false,
  isTyping = false,
}: ChatMessageProps) {
  if (isTyping) return <ChatMessageTyping />; // 사용자가 입력 중이라면, "입력 중" 애니메이션 표시

  if (message.type === "plan" && message.planData)
    // 요금제 추천을 받았을 경우, 요금제 추천 카드 출력
    return (
      <ChatMessagePlan content={message.content} planData={message.planData} />
    );

  if (message.role === "user")
    // 사용자 말풍선을 출력해줘야 할 경우
    return <ChatMessageUser content={message.content} />;

  return <ChatMessageBot content={message.content} isLast={isLastBotMessage} />; // 챗봇 말풍선을 출력해줘야 할 경우
}
