// hooks/useBotResponseGuard.ts
import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useVoiceControlStore } from "@/store/useVoiceControlStore";

export function useBotResponseGuard(trigger: boolean) {
  const messages = useChatStore((state) => state.messages);
  const { setWaitingForBotResponse } = useVoiceControlStore();
  const prevBotContent = useRef<string | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const latestBot = [...messages].reverse().find((m) => m.role === "bot");
    if (latestBot?.content !== prevBotContent.current) {
      prevBotContent.current = latestBot?.content || null;
      setWaitingForBotResponse(false); // 응답 도착 → 마이크 잠금 해제
    }
  }, [messages, trigger]);
}
