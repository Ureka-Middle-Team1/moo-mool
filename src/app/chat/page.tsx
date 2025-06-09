"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Message } from "@/types/Message";
import Header from "@/components/common/Header";
import TextPage from "./TextPage";

type Mode = "text" | "voice";

const dummyMessages: Message[] = [
  {
    role: "bot",
    content:
      "너 요즘 휴대폰으로 데이터 많이 쓰는 거 자주 해? 예를 들면, 휴대폰으로 영상을 많이 본다던가, 게임을 많이 한다던가 말이야.",
  },
  { role: "user", content: "난 정말 집에 가고 싶은데 말이야." },
  {
    role: "bot",
    content:
      "너 요즘 휴대폰으로 데이터 많이 쓰는 거 자주 해? 예를 들면, 휴대폰으로 영상을 많이 본다던가, 게임을 많이 한다던가 말이야.",
  },
  { role: "user", content: "나 휴대폰으로 영상 정말 많이 봐." },
];

export default function ChatbotPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = (searchParams.get("mode") as Mode) || "text";
  const isVoiceMode = mode === "voice";

  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput(""); // 초기화
  };

  // 스크롤 아래로 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 입력창 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="flex h-screen flex-col bg-pink-100">
      <Header />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mode === "text" ? (
          <TextPage messages={messages} setMessages={setMessages} />
        ) : (
          <h1>voice</h1>
        )}
      </div>
    </div>
  );
}
