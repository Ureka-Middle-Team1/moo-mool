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
  return (
    <div className="scrollbar-hide flex-1 space-y-2 overflow-y-auto px-4 py-2">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
