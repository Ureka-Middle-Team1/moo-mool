"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInputBox from "@/components/chat/ChatInputBox";
import { useChatStore } from "@/store/useChatStore";
import { useHandleAnswer } from "@/hooks/useHandleAnswer";
import { handleFreeTalkAnswer } from "@/lib/chat/handleFreeTalkAnswer";
import QuickReplyList from "@/components/chat/QuickReplyList";

// "텍스트"로 챗봇 기능을 사용하는 페이지
export default function TextPage() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);
  const { handleNormalizedAnswer } = useHandleAnswer();

  const { messages, appendMessage, currentQuestionId, setCurrentQuestionId } =
    useChatStore();

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
  const isQuick = (e: any): e is { type: "quick"; text: string } =>
    typeof e === "object" && e !== null && "type" in e && e.type === "quick";

  const handleSubmit = async (
    e?: FormEvent | KeyboardEvent | { type: "quick"; text: string }
  ) => {
    if (e && "preventDefault" in e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    const userMessage = isQuick(e) ? e.text : input.trim();

    if (!userMessage || isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    if (!isQuick(e)) {
      setTimeout(() => setInput(""), 0);
    }

    try {
      if (currentQuestionId === -1) {
        await handleFreeTalkAnswer(userMessage, setCurrentQuestionId);
        return;
      } else {
        await handleNormalizedAnswer(userMessage);
      }
    } catch (error) {
      console.error("onUserSubmit 처리 실패:", error);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <ChatMessageList messages={messages} bottomRef={bottomRef} />
      <QuickReplyList onSubmit={handleSubmit} />
      <ChatInputBox
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        textareaRef={textareaRef}
      />
    </div>
  );
}
