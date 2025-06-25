import { useEffect, useRef, useState } from "react";
import { useStreamingText } from "@/hooks/useStreamingText";

interface TypingMessageProps {
  fullText: string;
  onDone?: () => void;
  speed?: number; // 단어 간 출력 간격 (ms)
}

export default function TypingMessage({
  fullText,
  onDone,
  speed = 100,
}: TypingMessageProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [estimatedWidth, setEstimatedWidth] = useState(100);

  const displayedText = useStreamingText({
    fullText,
    speed,
    mode: "word",
    onDone,
  });

  useEffect(() => {
    function measureTextWidth(text: string, font = "14px Pretendard") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return 100;
      ctx.font = font;
      return ctx.measureText(text).width + 24;
    }

    const width = Math.min(measureTextWidth(fullText), 330);
    setEstimatedWidth(width);
  }, [fullText]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedText]);

  return (
    <>
      <div
        className="inline-block max-w-[15rem] min-w-[80px] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm break-words shadow-md"
        // style={{ width: `${estimatedWidth}px` }}
      >
        {displayedText}
      </div>
      <div ref={bottomRef} />
    </>
  );
}
