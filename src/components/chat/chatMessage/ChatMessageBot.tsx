import TypingMessage from "../TypingMessage";

// 무너 메시지 컴포넌트
export default function ChatMessageBot({
  content,
  isLast,
}: {
  content: string;
  isLast: boolean;
}) {
  return (
    <div className="flex items-start justify-start gap-2">
      <img
        src="/assets/moono/chatbot-moono.png"
        alt="무너"
        className="mt-1 h-8 w-8 rounded-full"
      />
      <div className="flex flex-col">
        <span className="mb-1 text-xs text-gray-800">무너</span>
        {isLast ? (
          <TypingMessage fullText={content} />
        ) : (
          <div className="max-w-[75%] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm shadow-md">
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
