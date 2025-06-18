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
    <div className="fixed inset-0 flex justify-center bg-gray-200">
      <div className="relative flex h-full w-full max-w-[430px] flex-col bg-pink-100">
        <div className="sticky top-0 z-10 w-full bg-white">
          <Header />
        </div>

        <div className="min-h-0 flex-1">
          {mode === "text" ? <TextPage /> : <VoicePage />}
        </div>
      </div>
    </div>
  );
}
