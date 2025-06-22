"use client";

import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";
import { useChatModeStore } from "@/store/useChatModeStore";
import Header from "@/components/chat/ChatbotHeader";

export default function ChatbotPage() {
  const { mode } = useChatModeStore();

  useWatchRecommendationTrigger();

  return (
    <div className="flex h-screen flex-col bg-[#FFF6F6]">
      <Header title="챗봇" />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </div>
    </div>
  );
}
