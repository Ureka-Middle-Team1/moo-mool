"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextPageProps } from "@type/textPageProps";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInputBox from "@/components/chat/ChatInputBox";

// "텍스트"로 챗봇 기능을 사용하는 페이지
export default function TextPage({
  messages,
  onUserSubmit,
  setMessages,
}: TextPageProps) {
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

  // 컴포넌트 마운트 시 1회 실행 (첫 질문은 자동으로 나와야 하기 때문에)
  useEffect(() => {
    const firstQuestion = questionTextMap[1];
    if (firstQuestion) {
      setMessages([{ role: "bot", content: firstQuestion }]);
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (!input.trim() || isSubmittingRef.current) return;

    const userMessage = input.trim();
    isSubmittingRef.current = true;

    // 1. 입력 비우기
    setTimeout(() => {
      setInput("");
    }, 0);

    try {
      // 2. 외부 처리 로직 실행 (정규화, 업데이트, 다음 질문 등)
      await onUserSubmit(userMessage);
    } catch (error) {
      // 3. 필요 시 에러 핸들링 (옵션)
      console.error("onUserSubmit 처리 실패:", error);
    } finally {
      // 4. 중복 제출 방지 해제
      isSubmittingRef.current = false;
    }
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
