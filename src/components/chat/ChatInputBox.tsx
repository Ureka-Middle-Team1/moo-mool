"use client";
import { ArrowUp, Mic, Plus } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useChatStreamingStore } from "@/store/useChatStreamingStore";
import { SubmitType } from "@/hooks/useChatSubmit";
import debounce from "lodash.debounce"; // 디바운싱 편하게 해주는 객체 (설치 필요)
import { Button } from "../ui/button";
import { useChatStore } from "@/store/useChatStore";
import { useChatModeStore } from "@/store/useChatModeStore";

interface ChatInputBoxProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e?: SubmitType) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  disabled?: boolean;
}

export default function ChatInputBox({
  input,
  setInput,
  onSubmit,
  textareaRef,
}: ChatInputBoxProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const isStreaming = useChatStreamingStore((state) => state.isStreaming);
  const { setIsTyping } = useChatStore();
  const { mode, setMode } = useChatModeStore();

  const onTypingStart = () => {
    setIsTyping(true);
  };

  const onTypingEnd = () => {
    setIsTyping(false);
  };

  // 타이핑 끝 감지를 위한 debounce (1초 후에 타이핑 종료로 간주)
  const debounceTypingEnd = useCallback(
    debounce(() => {
      onTypingEnd();
    }, 1000),
    [onTypingEnd]
  );

  // 컴포넌트 unmount 시 debounce 정리
  useEffect(() => {
    return () => {
      debounceTypingEnd.cancel();
    };
  }, [debounceTypingEnd]);

  const handleMicClick = () => {
    setMode("voice");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    onTypingStart();
    debounceTypingEnd(); // debounce 재시작
  };

  // 엔터키 누른 것을 감지 (onKeyUp으로 감지)
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming) {
        onSubmit(e);
        onTypingEnd(); // 즉시 종료 처리
        debounceTypingEnd.cancel();
      }
    } else {
      onTypingStart();
      debounceTypingEnd(); // 일반 키 입력 시 debounce 재시작
    }
  };

  const handleBlur = () => {
    onTypingEnd();
    debounceTypingEnd.cancel();
  };
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="w-full border-t border-gray-200 bg-gray-100 px-3 py-3">
      <div className="flex items-center gap-2 rounded-full bg-gray-400 px-3 py-2">
        {/* 입력창 */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          placeholder="무너에게 물어봐!"
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm placeholder-gray-700 focus:outline-none"
          style={{ fontSize: "16px" }}
        />

        {/* 버튼들 */}
        <div className="flex gap-1">
          {/* Mic 버튼 (고정 색상) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full bg-pink-300 text-gray-100"
            disabled={isStreaming}
            onClick={handleMicClick}>
            <Mic className="h-5 w-5" />
          </Button>

          {/* 전송 버튼 (조건부 색상 변경) */}
          <Button
            type="submit"
            size="icon"
            className={`rounded-full p-1 transition-colors ${
              input.trim().length > 0 && !isStreaming
                ? "bg-pink-300 text-white"
                : "bg-pink-300 text-gray-100"
            }`}
            disabled={isStreaming || input.trim().length === 0}>
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
