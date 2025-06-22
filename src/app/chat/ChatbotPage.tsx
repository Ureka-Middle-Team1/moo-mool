"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/chat/ChatbotHeader";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";
import { useChatStore } from "@/store/useChatStore";

type Mode = "text" | "voice";

export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const chatSummary = useChatStore((state) => state.chatSummary);
  const mode = (searchParams.get("mode") as Mode) || "text";

  useWatchRecommendationTrigger();

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header title={chatSummary || "챗봇"} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </div>
    </div>
  );
}
