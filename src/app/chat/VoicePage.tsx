import CharacterScene from "@/components/chat/CharacterScene";
import VoiceFooter from "@/components/chat/VoiceFooter";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";
import { TextPageProps } from "@type/textPageProps";
import { useEffect, useState } from "react";

export default function VoicePage({
  messages,
  onUserSubmit,
  setMessages,
}: TextPageProps) {
  const [input, setInput] = useState("");

  // 컴포넌트 마운트 시 1회 실행 (첫 질문은 자동으로 나와야 하기 때문에)
  useEffect(() => {
    const firstQuestion = questionTextMap[1];
    if (firstQuestion) {
      setMessages([{ role: "bot", content: firstQuestion }]);
    }
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <CharacterScene />
      <VoiceFooter />
    </div>
  );
}
