"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/chat/ChatbotHeader";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";

type Mode = "text" | "voice";

export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Mode) || "text";

  useWatchRecommendationTrigger();

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#FFF6F6]">
      {/* Header - 고정 */}
      <header className="absolute top-0 right-0 left-0 z-50 bg-white">
        <Header title="챗봇" />
      </header>

      {/* Main Content - 스크롤 가능 */}
      <main className="flex-1 overflow-hidden pt-12">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </main>
    </div>
  );
}
