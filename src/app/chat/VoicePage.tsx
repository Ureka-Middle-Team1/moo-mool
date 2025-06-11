import CharacterScene from "@/components/chat/CharacterScene";
import VoiceFooter from "@/components/chat/VoiceFooter";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";
import { TextPageProps } from "@type/textPageProps";
import { useEffect, useState } from "react";

export default function VoicePage({ onUserSubmit }: TextPageProps) {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <CharacterScene />
      <VoiceFooter />
    </div>
  );
}
