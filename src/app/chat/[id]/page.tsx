"use client";

import { useParams } from "next/navigation";
import { useGetChatSession } from "@/hooks/useGetChatSession";
import ChatMessageList from "@/components/chat/ChatMessageList";
import { Message } from "@/types/Chat";
import Header from "@/components/chat/ChatbotHeader";
import ChatbotHeaderSkeleton from "@/components/skeleton/ChatHeaderSkeleton";
import ChatMessageListSkeleton from "@/components/skeleton/ChatMessageListSkeleton";
import NotFound from "@/app/not-found";

export default function ChatSessionDetailPage() {
  const { id } = useParams();
  const sessionId = Number(id);

  const { data, isLoading, error } = useGetChatSession(sessionId);

  // 에러 처리
  if (error) {
    return <NotFound />;
  }

  // 메시지 파싱
  let parsedMessages: Message[] = [];
  if (!isLoading && data) {
    try {
      parsedMessages = JSON.parse(data.messages);
    } catch (e) {
      console.error("❌ 메시지 파싱 오류:", e);
      return (
        <p className="p-4 text-sm text-red-500">
          대화 내역을 불러올 수 없습니다.
        </p>
      );
    }
  }

  return (
    <div className="relative flex h-full w-full max-w-[430px] flex-col bg-[#f9f4f4]">
      {/* 상단 Header */}
      <div className="sticky top-0 z-10 w-full bg-white">
        {isLoading ? (
          <ChatbotHeaderSkeleton />
        ) : (
          <Header title={data.summary} />
        )}
      </div>

      {/* 메시지 리스트 */}
      {isLoading ? (
        <ChatMessageListSkeleton />
      ) : (
        <ChatMessageList messages={parsedMessages} />
      )}

      {/* 하단 안내 */}
      {!isLoading && (
        <div className="border-t px-4 py-3 text-center text-sm text-gray-700">
          이 대화는 종료된 세션입니다. 입력은 불가능합니다.
        </div>
      )}
    </div>
  );
}
