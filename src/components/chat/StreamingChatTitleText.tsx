import { useStreamingText } from "@/hooks/useStreamingText";
import { useEffect, useState } from "react";

interface StreamingTextProps {
  text: string;
  speed?: number;
  triggerKey?: string;
  className?: string;
  onDone?: () => void;
}

// 채팅방 제목에 쓰일 StreamingText
export default function StreamingText({
  text,
  speed = 50,
  triggerKey,
  className,
  onDone,
}: StreamingTextProps) {
  const [fontReady, setFontReady] = useState(false);

  // 기본은 글자 단위
  const streamed = useStreamingText({
    fullText: text,
    speed,
    mode: "char",
    triggerKey: triggerKey || text,
    onDone,
  });

  useEffect(() => {
    // (선택) 폰트 적용 대기: 레이아웃 깜빡임 방지
    document.fonts.ready.then(() => setFontReady(true));
  }, []);

  return (
    <span
      className={className}
      style={{ visibility: fontReady ? "visible" : "hidden" }}>
      {streamed}
    </span>
  );
}
