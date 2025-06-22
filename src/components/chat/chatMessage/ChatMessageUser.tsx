// 사용자 메시지 컴포넌트
export default function ChatMessageUser({ content }: { content: string }) {
  return (
    <div className="flex items-start justify-end gap-2">
      <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-3 py-2 text-sm shadow-md">
        {content}
      </div>
    </div>
  );
}
