"use client";

import CharacterScene from "@/components/chat/CharacterScene";
import Header from "@/components/common/Header";
import { useRouter, useSearchParams } from "next/navigation";
type Mode = "text" | "voice";

export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 모드 추출
  const mode = (searchParams.get("mode") as Mode) || "text";

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header />
      {/* 내용 영역 */}
      <div className="flex-1 overflow-hidden">
        {mode === "text" ? <h1>text</h1> : <h1>voice</h1>}
      </div>
    </div>
  );
}
