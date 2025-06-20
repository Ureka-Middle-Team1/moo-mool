"use client";

import { useState } from "react";
import ChatbotHeader from "@/components/chat/ChatbotHeader";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";
import { useModalStore } from "@/store/useModalStore";
import MyPageModal from "@/components/myPage/MyPageModal";

export default function ChatbotPage() {
  const { isModalOpen, setModalOpen } = useModalStore();
  const [mode, setMode] = useState<"text" | "voice">("text");

  useWatchRecommendationTrigger();

  return (
    <div className="flex h-screen flex-col bg-[#FFF6F6]">
      <ChatbotHeader mode={mode} setMode={setMode} onAvatarClick={() => {}} />
      <MyPageModal open={isModalOpen} onOpenChange={setModalOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? (
          <TextPage setMode={setMode} />
        ) : (
          <VoicePage setMode={setMode} />
        )}
      </div>
    </div>
  );
}
