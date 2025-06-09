import CharacterScene from "@/components/chat/CharacterScene";
import VoiceFooter from "@/components/chat/VoiceFooter";

export default function VoicePage() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <CharacterScene />
      <VoiceFooter />
    </div>
  );
}
