import { Message } from "@/types/Chat";
import ChatMessage from "./ChatMessage";
import { useChatStore } from "@/store/useChatStore";
import { AnimatePresence } from "framer-motion";
import QuickReplyList from "./QuickReplyList";
import { useChatSubmit } from "@/hooks/useChatSubmit";

interface ChatMessageListProps {
  messages: Message[];
  bottomRef?: React.RefObject<HTMLDivElement | null>;
  isTyping: boolean;
}

export default function ChatMessageList({
  messages,
  bottomRef,
  isTyping,
}: ChatMessageListProps) {
  const { getLastBotMessage } = useChatStore();

  const lastBot = getLastBotMessage();
  const isLastMessageBot = lastBot && messages[messages.length - 1] === lastBot;

  return (
    <div className="scrollbar-hide h-full overflow-y-auto">
      <div className="space-y-2 px-4 py-2">
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
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
