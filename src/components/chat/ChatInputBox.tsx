"use client";
import { ArrowUp, Mic } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useChatStreamingStore } from "@/store/useChatStreamingStore";
import { SubmitType } from "@/hooks/useChatSubmit";

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
  const formRef = useRef<HTMLFormElement>(null); // 엔터키 중복 방지를 위한 ref

  const router = useRouter();
  const isStreaming = useChatStreamingStore((state) => state.isStreaming);

  const handleMicClick = () => {
    router.push("?mode=voice");
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
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
            if (!isStreaming) {
              onSubmit(e);
            }
          }
        }}
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
