import { Message } from "@/types/Chat";
import PlanCard from "./PlanCard";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  if (message.type === "plan" && message.planData) {
    return (
      <div className="flex items-start justify-start gap-2 py-2">
        <img
          src="/assets/moono/chatbot-moono.png"
          alt="무너"
          className="mt-1 h-8 w-8 rounded-full"
        />
        <div className="flex w-full flex-col">
          <span className="mb-1 text-xs text-gray-800">무너</span>
          <PlanCard {...message.planData} />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}>
      {!isUser && (
        <>
          <img
            src="/assets/moono/chatbot-moono.png"
            alt="무너"
            className="mt-1 h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="mb-1 text-xs text-gray-800">무너</span>
            <div className="max-w-[75%] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm shadow-md">
              {message.content}
            </div>
          </div>
        </>
      )}
      {isUser && (
        <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-3 py-2 text-sm shadow-md">
          {message.content}
        </div>
      )}
    </div>
  );
}
