"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/chat/ChatbotHeader";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";
import { useState } from "react";
import MyPageModal from "@/components/myPage/MyPageModal";

type Mode = "text" | "voice";

export default function ChatbotPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Mode) || "text";

  useWatchRecommendationTrigger();

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header title="챗봇" onAvatarClick={() => setIsModalOpen(true)} />
      {/* 마이페이지 Modal */}
      <MyPageModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </div>
    </div>
  );
}
