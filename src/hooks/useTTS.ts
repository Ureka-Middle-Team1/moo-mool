import { useTTSStore } from "@/store/useTTSStore";
import { useState } from "react";
import { fetchTTSFromServer } from "@/lib/fetchTTS"; // 위 함수 위치에 따라 경로 조정

export function useTTS() {
  const { setIsSpeaking } = useTTSStore();
  const [isLoading, setIsLoading] = useState(false);

  const speak = async (text: string) => {
    if (!text) return;

    setIsSpeaking(true);
    setIsLoading(true);

    try {
      const audioContent = await fetchTTSFromServer(text); // ← axios로 호출
      const audioBlob = base64ToBlob(audioContent, "mp3");
      const audio = new Audio(URL.createObjectURL(audioBlob));

      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => {
        console.error("오디오 재생 실패");
        setIsSpeaking(false);
      };

      audio.play();
    } catch (error) {
      console.error("TTS 요청 실패", error);
      setIsSpeaking(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { speak, isLoading };
}


function base64ToBlob(base64: string, fileType: string): Blob {
  const byteString = atob(base64);
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([byteArray], { type: `audio/${fileType}` });
}
