import { Message } from "@/types/Chat";
import ChatMessage from "./ChatMessage";

interface ChatMessageListProps {
  messages: Message[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessageList({
  messages,
  bottomRef,
}: ChatMessageListProps) {
  const lastBotIndex = [...messages]
    .reverse()
    .findIndex((msg) => msg.role === "bot");

  const realLastBotIndex =
    lastBotIndex === -1 ? -1 : messages.length - 1 - lastBotIndex;

  return (
    <div className="scrollbar-hide flex-1 space-y-2 overflow-y-auto px-4 py-2">
      {messages.map((msg, idx) => (
        <ChatMessage
          key={idx}
          message={msg}
          isLastBotMessage={idx === realLastBotIndex}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
