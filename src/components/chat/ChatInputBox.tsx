import { ArrowUp, Mic } from "lucide-react";

interface ChatInputBoxProps {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function ChatInputBox({
  input,
  setInput,
  onSubmit,
  textareaRef,
}: ChatInputBoxProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-t-2xl bg-[#FFEBAF] px-4 pt-3 pb-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="무너에게 물어봐!"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
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
  );
}
