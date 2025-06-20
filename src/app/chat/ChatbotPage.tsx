"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/chat/ChatbotHeader";
import TextPage from "./TextPage";
import VoicePage from "./VoicePage";
import { useWatchRecommendationTrigger } from "@/hooks/useWatchRecommendationTrigger";
import { useModalStore } from "@/store/useModalStore";

import MyPageModal from "@/components/myPage/MyPageModal";
import { useChatModeStore } from "@/store/useChatModeStore";

export default function ChatbotPage() {
  const { isModalOpen, setModalOpen, openModal } = useModalStore();
  const { mode } = useChatModeStore();

  useWatchRecommendationTrigger();

  return (
    <div className="flex h-screen flex-col bg-[#FFF6F6]">
      <Header title="챗봇" onAvatarClick={() => {}} />
      <MyPageModal open={isModalOpen} onOpenChange={setModalOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? <TextPage /> : <VoicePage />}
      </div>
    </div>
  );
}
