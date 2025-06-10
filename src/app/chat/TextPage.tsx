"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/Chat";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInputBox from "@/components/chat/ChatInputBox";

interface TextPageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function TextPage({ messages, setMessages }: TextPageProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);

  // 스크롤 아래로 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 텍스트 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (!input.trim() || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setMessages((prev) => [...prev, { role: "user", content: input.trim() }]);

    // 입력 비우기
    setTimeout(() => {
      setInput("");
    }, 0);

    // 중복 제출 방지 해제
    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 500);
  };
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatMessageList messages={messages} bottomRef={bottomRef} />
      <ChatInputBox
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        textareaRef={textareaRef}
      />
    </div>
  );
}
