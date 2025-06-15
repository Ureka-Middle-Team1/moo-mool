import { Suspense } from "react";
import ChatbotPage from "./ChatbotPage";

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatbotPage />
    </Suspense>
  );
}
