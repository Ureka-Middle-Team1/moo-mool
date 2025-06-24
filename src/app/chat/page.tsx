import { Suspense } from "react";
import ChatbotPage from "./ChatbotPage";
import GlobalLoading from "../loading";

export default function ChatPage() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <ChatbotPage />
    </Suspense>
  );
}
