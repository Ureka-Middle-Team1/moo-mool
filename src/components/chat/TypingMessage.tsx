import { useEffect, useState, useRef } from "react";

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
  const [displayedText, setDisplayedText] = useState("");
  const words = fullText.split(" ");
  const [wordIndex, setWordIndex] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);

  // const estimatedWidth = Math.min(fullText.length * 8 + 24, 320);
  function measureTextWidth(text: string, font = "14px Pretendard") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return 100;
    ctx.font = font;
    return ctx.measureText(text).width + 24; // padding 고려
  }
  const estimatedWidth = Math.min(measureTextWidth(fullText), 322.5);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedText]);

  useEffect(() => {
    if (wordIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          prev.length === 0 ? words[wordIndex] : `${prev} ${words[wordIndex]}`
        );
        setWordIndex(wordIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onDone?.();
    }
  }, [wordIndex, words]);

  return (
    <>
      <div
        className="max-w-[75%] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm shadow-md"
        style={{ width: `${estimatedWidth}px` }}>
        {displayedText}
      </div>
      <div ref={bottomRef} />
    </>
  );
}
