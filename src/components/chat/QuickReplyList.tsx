"use client";

import { useChatStore } from "@/store/useChatStore";
import QuickReplyButton from "./QuickReplyButton";
import { FormEvent } from "react";

type SubmitType = { type: "quick"; text: string } | FormEvent | KeyboardEvent;

interface QuickReplyListProps {
  onSubmit?: (e?: SubmitType) => void;
}

export default function QuickReplyList({ onSubmit }: QuickReplyListProps) {
  const { quickReplies, setQuickReplies, appendMessage } = useChatStore();

  if (quickReplies.length === 0) return null;

  const handleClick = (text: string) => {
    setQuickReplies([]);
    onSubmit?.({ type: "quick", text });
  };

  return (
    <div className="w-full px-4 pb-2">
      <div className="scrollbar-hide overflow-x-auto">
        <div className="inline-flex w-fit gap-2 whitespace-nowrap">
          {quickReplies.map((reply, idx) => (
            <QuickReplyButton
              key={idx}
              label={reply}
              onClick={() => handleClick(reply)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
