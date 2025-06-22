"use client";

import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";
import { useChatStore } from "@/store/useChatStore";
import { useChatModeStore } from "@/store/useChatModeStore";
import Header from "@/components/chat/ChatbotHeader";

export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const chatSummary = useChatStore((state) => state.chatSummary);
  const { mode } = useChatModeStore();

  useWatchRecommendationTrigger();

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#FFF6F6]">
      {/* Header - 고정 */}
      <header className="absolute top-0 right-0 left-0 z-50 bg-white">
        <Header title={chatSummary || "챗봇"} />
      </header>

      {/* Main Content - 스크롤 가능 */}
      <main className="flex-1 overflow-hidden pt-12">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </main>
    </div>
  );
}
