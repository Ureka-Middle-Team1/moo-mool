"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Message } from "@/types/Message";
import Header from "@/components/common/Header";
import TextPage from "./TextPage";
import VoicePage from "./voicePage";

type Mode = "text" | "voice";

export default function ChatbotPage() {
  const searchParams = useSearchParams();

  const mode = (searchParams.get("mode") as Mode) || "text";
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? (
          <TextPage messages={messages} setMessages={setMessages} />
        ) : (
          <VoicePage />
        )}
      </div>
    </div>
  );
}
