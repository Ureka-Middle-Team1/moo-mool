"use client";

import { useChatStore } from "@/store/useChatStore";
import QuickReplyButton from "./QuickReplyButton";

export default function QuickReplyList() {
  const { quickReplies, setQuickReplies, appendMessage } = useChatStore();

  if (quickReplies.length === 0) return null;

  const handleClick = (text: string) => {
    // 1. 메시지 추가
    appendMessage({ role: "user", content: text });

    // 2. 선택지 제거
    setQuickReplies([]);

    // 3. 이후 흐름 진행 - 여기에 GPT 호출 등 추가하면 됨
    // handleChatbotResponse(text); ← 예시 (추후 분기 처리)
  };

  return (
    <div className="w-full px-4">
      <div className="scrollbar-hide overflow-x-auto">
        <div className="flex w-fit gap-2 whitespace-nowrap">
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
