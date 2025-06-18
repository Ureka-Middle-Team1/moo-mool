import { Suspense } from "react";
import ChatbotHistoryPage from "./ChatbotHistoryPage";
import Header from "@/components/chat/ChatbotHeader";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header title="챗봇 대화 내역" />
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatbotHistoryPage />
      </Suspense>
    </div>
  );
}
