"use client";

import { useParams } from "next/navigation";
import { useGetChatSession } from "@/hooks/useGetChatSession";
import ChatMessageList from "@/components/chat/ChatMessageList";
import { Message } from "@/types/Chat";
import Header from "@/components/chat/ChatbotHeader";
import { useModalStore } from "@/store/useModalStore";
import MyPageModal from "@/components/myPage/MyPageModal";

// 챗봇과의 특정 대화에 대해서 대화 내역을 보여주는 페이지
export default function ChatSessionDetailPage() {
  const { id } = useParams();
  const sessionId = Number(id);

  const { data, isLoading, error } = useGetChatSession(sessionId);
  const { isModalOpen, setModalOpen } = useModalStore();

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !data) return <p className="p-4">세션을 불러올 수 없습니다.</p>;

  const parsedMessages: Message[] = JSON.parse(data.messages);
  console.log("parsedMessage: ", parsedMessages);

  return (
    <div className="relative flex h-full w-full max-w-[430px] flex-col bg-pink-100">
      <div className="sticky top-0 z-10 w-full bg-white">
        <Header title={data.summary} />
      </div>
      <MyPageModal open={isModalOpen} onOpenChange={setModalOpen} />
      <ChatMessageList messages={parsedMessages} />
      <div className="border-t px-4 py-3 text-center text-sm text-gray-700">
        이 대화는 종료된 세션입니다. 입력은 불가능합니다.
      </div>
    </div>
  );
}
