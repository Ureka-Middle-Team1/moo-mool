import { Message } from "@/types/Chat";
import ChatMessage from "./chatMessage/ChatMessage";
import { useChatStore } from "@/store/useChatStore";
import { AnimatePresence } from "framer-motion";

interface ChatMessageListProps {
  messages: Message[];
  bottomRef?: HTMLDivElement;
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  const { getLastBotMessage, isTyping } = useChatStore();

  const lastBot = getLastBotMessage();
  const isLastMessageBot = lastBot && messages[messages.length - 1] === lastBot;

  return (
    <div className="scrollbar-hide h-full overflow-y-auto">
      <div className="space-y-2 px-4 py-2 pb-10">
        {messages.map((msg, idx) => {
          const isLast = isLastMessageBot && msg === lastBot;
          return (
            <ChatMessage key={idx} message={msg} isLastBotMessage={isLast} />
          );
        })}

        {/* "입력 중"인 상태일 때 애니메이션 메시지 추가 */}
        <AnimatePresence initial={false} mode="wait">
          {isTyping && (
            <ChatMessage
              key="typing"
              message={{ role: "user", content: "" }} // 콘텐츠는 표시하지 않고 애니메이션만
              isTyping={true}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
