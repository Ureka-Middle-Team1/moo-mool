import { useChatStreamingStore } from "@/store/useChatStreamingStore";
import { useEffect, useState } from "react";

interface UseStreamingTextParams {
  fullText: string;
  speed?: number;
  mode?: "word" | "char";
  onDone?: () => void;
  triggerKey?: string;
}

export function useStreamingText({
  fullText,
  speed = 100,
  mode = "word",
  onDone,
  triggerKey,
}: UseStreamingTextParams) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const { setIsStreaming } = useChatStreamingStore();

  const units = mode === "word" ? fullText.split(" ") : [...fullText];

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
    if (units.length > 0) {
      setIsStreaming(true);
    }
  }, [triggerKey, fullText]);

  useEffect(() => {
    if (index >= units.length) return;

    const timeout = setTimeout(() => {
      const next = units[index];
      setDisplayedText((prev) =>
        prev.length === 0
          ? next
          : mode === "word"
            ? `${prev} ${next}`
            : `${prev}${next}`
      );

      const nextIndex = index + 1;
      setIndex(nextIndex);

      if (nextIndex === units.length) {
        setIsStreaming(false);
        onDone?.();
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, units, speed, mode]);

  return displayedText;
}
