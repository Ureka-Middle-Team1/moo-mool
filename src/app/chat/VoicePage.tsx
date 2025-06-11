import CharacterScene from "@/components/chat/CharacterScene";
import VoiceFooter from "@/components/chat/VoiceFooter";
import { useState } from "react";

export default function VoicePage() {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <CharacterScene />
      <VoiceFooter />
    </div>
  );
}
