"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useHandleAnswer } from "@/hooks/useHandleAnswer";

// "텍스트"로 챗봇 기능을 사용하는 페이지
export default function TextPage() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null); // 엔터키 중복 방지를 위한 ref
  const isSubmittingRef = useRef(false);
  const { handleNormalizedAnswer } = useHandleAnswer();

  const { messages } = useChatStore();

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
      await handleNormalizedAnswer(userMessage);
    } catch (error) {
      // 3. 필요 시 에러 핸들링 (옵션)
      console.error("onUserSubmit 처리 실패:", error);
    } finally {
      // 4. 중복 제출 방지 해제
      isSubmittingRef.current = false;
    }
  };

  return (
    <>
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}>
            {msg.role === "bot" && (
              <>
                <img
                  src="/moono.png"
                  alt="무너"
                  className="mt-1 h-8 w-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="mb-1 text-[12px] text-gray-500">무너</span>
                  <div className="max-w-[75%] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white px-3 py-2 text-sm shadow">
                    {msg.content}
                  </div>
                </div>
              </>
            )}
            {msg.role === "user" && (
              <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-3 py-2 text-sm shadow">
                {msg.content}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-t-2xl bg-[#FFEBAF] px-4 pt-3 pb-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="무너에게 물어봐!"
          onKeyUp={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              // 중복 호출 방지
              if (!isSubmittingRef.current) {
                handleSubmit();
              }
            }
          }}
          className="w-full resize-none bg-[#FFEBAF] text-sm placeholder-[#94A3B8] focus:outline-none"
        />
        <div className="mt-2 flex justify-end gap-3">
          <button type="button" className="text-[#94A3B8]">
            <Mic size={20} />
          </button>
          <button type="submit" className="text-[#94A3B8]">
            <ArrowUp size={20} />
          </button>
        </div>
      </form>
    </>
  );
}
