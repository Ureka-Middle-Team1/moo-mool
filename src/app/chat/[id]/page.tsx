"use client";

import { useParams } from "next/navigation";
import { useGetChatSession } from "@/hooks/useGetChatSession";
import ChatMessageList from "@/components/chat/ChatMessageList";
import { Message } from "@/types/Chat";
import Header from "@/components/chat/ChatbotHeader";

export default function ChatSessionDetailPage() {
  const { id } = useParams();
  const sessionId = Number(id);

  const { data, isLoading, error } = useGetChatSession(sessionId);

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !data) return <p className="p-4">세션을 불러올 수 없습니다.</p>;

  const parsedMessages: Message[] = JSON.parse(data.messages);

  return (
    <div className="relative flex h-full w-full max-w-[430px] flex-col bg-pink-100">
      <div className="sticky top-0 z-10 w-full bg-white">
        <Header text={data.summary} />
      </div>
      <ChatMessageList messages={parsedMessages} />

      <div className="border-t px-4 py-3 text-center text-sm text-gray-700">
        이 대화는 종료된 세션입니다. 입력은 불가능합니다.
      </div>
    </div>
  );
}
