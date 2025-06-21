"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInputBox from "@/components/chat/ChatInputBox";
import { useChatStore } from "@/store/useChatStore";
import QuickReplyList from "@/components/chat/QuickReplyList";
import { useChatSubmit } from "@/hooks/useChatSubmit";
import ChatProgressToast from "@/components/chat/ChatProgressRoadmap";

// "텍스트"로 챗봇 기능을 사용하는 페이지
export default function TextPage() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const quickReplyRef = useRef<HTMLDivElement>(null); // "정해진 답변" 리스트업 되는 영역

  const { messages, currentQuestionId, isTyping } = useChatStore();

  // 메시지 추가될 때 스크롤 아래로 이동
  useEffect(() => {
    if (!bottomRef.current || !quickReplyRef.current) return;

    const replyHeight = quickReplyRef.current.offsetHeight;

    const elementTop =
      bottomRef.current.getBoundingClientRect().top + window.scrollY;
    const targetScroll = elementTop - replyHeight; // quickReply 영역을 고려해서 그만큼 위로 스크롤해야 함

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, [messages]);

  // 텍스트 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const { handleSubmit } = useChatSubmit(input, setInput, textareaRef);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <ChatProgressToast currentQuestionId={currentQuestionId} />
      <ChatMessageList
        messages={messages}
        bottomRef={bottomRef}
        isTyping={isTyping}
      />
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
