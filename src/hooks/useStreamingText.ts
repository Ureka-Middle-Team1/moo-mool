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

  const units = mode === "word" ? fullText.split(" ") : [...fullText];

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [triggerKey, fullText]);

  useEffect(() => {
    if (index < units.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          prev.length === 0
            ? units[index]
            : mode === "word"
              ? `${prev} ${units[index]}`
              : `${prev}${units[index]}`
        );
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onDone?.();
    }
  }, [index, units, speed, onDone, mode]);

  return displayedText;
}
