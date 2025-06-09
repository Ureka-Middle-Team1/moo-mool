import { Message } from "@/types/Chat";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}>
      {!isUser && (
        <>
          <img
            src="/moono.png"
            alt="무너"
            className="mt-1 h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="mb-1 text-[12px] text-gray-500">무너</span>
            <div className="max-w-[75%] rounded-xl bg-white px-3 py-2 text-sm shadow">
              {message.content}
            </div>
          </div>
        </>
      )}
      {isUser && (
        <div className="max-w-[75%] rounded-xl bg-[#FFF3B0] px-3 py-2 text-sm shadow">
          {message.content}
        </div>
      )}
    </div>
  );
}
