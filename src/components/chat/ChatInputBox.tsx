"use client";
import { ArrowUp, Mic } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useChatStreamingStore } from "@/store/useChatStreamingStore";
import { SubmitType } from "@/hooks/useChatSubmit";
import debounce from "lodash.debounce"; // 디바운싱 편하게 해주는 객체 (설치 필요)

interface ChatInputBoxProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e?: SubmitType) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  disabled?: boolean;
  onTypingStart: () => void;
  onTypingEnd: () => void;
}

export default function ChatInputBox({
  input,
  setInput,
  onSubmit,
  textareaRef,
  onTypingStart,
  onTypingEnd,
}: ChatInputBoxProps) {
  const formRef = useRef<HTMLFormElement>(null); // 엔터키 중복 방지를 위한 ref

  const router = useRouter();
  const isStreaming = useChatStreamingStore((state) => state.isStreaming);

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
    router.push("?mode=voice");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    onTypingStart();
    debounceTypingEnd(); // debounce 재시작
  };

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
      className="rounded-t-2xl bg-[#FFEBAF] px-4 pt-3 pb-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        placeholder="무너에게 물어봐!"
        className="w-full resize-none bg-[#FFEBAF] text-sm placeholder-[#94A3B8] focus:outline-none"
      />
      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          className="text-[#94A3B8]"
          disabled={isStreaming}
          onClick={handleMicClick}>
          <Mic size={20} />
        </button>
        <button type="submit" className="text-[#94A3B8]" disabled={isStreaming}>
          <ArrowUp size={20} />
        </button>
      </div>
    </form>
  );
}
