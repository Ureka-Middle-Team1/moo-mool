"use client";

import { FormEvent, KeyboardEvent, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useHandleAnswer } from "@/hooks/useHandleAnswer";
import { handleFreeTalkAnswer } from "@/lib/chat/handleFreeTalkAnswer";
export type SubmitType =
  | FormEvent<HTMLFormElement>
  | KeyboardEvent<HTMLTextAreaElement>
  | { type: "quick"; text: string };

function isQuickSubmit(e: any): e is { type: "quick"; text: string } {
  return (
    typeof e === "object" && e !== null && "type" in e && e.type === "quick"
  );
}

export function useChatSubmit(
  input: string,
  setInput: (val: string) => void,
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
) {
  const isSubmittingRef = useRef(false);
  const { handleNormalizedAnswer } = useHandleAnswer();
  const { appendMessage, currentQuestionId, setCurrentQuestionId } =
    useChatStore();

  const handleSubmit = async (e?: SubmitType) => {
    console.log("handle submit 호출");

    if (e && "preventDefault" in e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    const userMessage = isQuickSubmit(e) ? e.text : input.trim();
    if (!userMessage || isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    //  입력창 비우기
    if (!isQuickSubmit(e)) {
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

  return { handleSubmit };
}
