import { useEffect, useState } from "react";

export function useTTS(voiceName = "Google 한국의 여성") {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const koreanVoices = voices.filter((v) => v.lang.startsWith("ko"));
      const selected = koreanVoices.find((v) => v.name === voiceName);
      if (selected) setVoice(selected);
    };

    if (speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [voiceName]);

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    if (voice) utter.voice = voice;
    speechSynthesis.speak(utter);
  };

  return { speak, voice };
}
