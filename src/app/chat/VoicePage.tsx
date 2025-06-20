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
    <div className="flex h-full flex-col items-center justify-between">
      <CharacterScene />
      <VoiceFooter />
    </div>
  );
}
