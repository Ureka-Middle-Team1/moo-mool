"use client";

import dynamic from "next/dynamic";
import VoiceFooter from "@/components/chat/VoiceFooter";

const CharacterScene = dynamic(
  () => import("@/components/chat/CharacterScene"),
  {
    ssr: false,
  }
);

export default function VoicePage() {
  return (
    <div className="relative h-full w-full">
      {/* 캐릭터 영역 */}
      <div className="absolute top-0 right-0 bottom-24 left-0 overflow-hidden">
        <CharacterScene />
      </div>

      {/* 마이크 버튼 */}
      <div className="absolute right-0 bottom-5 left-0">
        <VoiceFooter />
      </div>
    </div>
  );
}
