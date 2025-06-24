"use client";

import { useChatStore } from "@/store/useChatStore";
import QuickReplyButton from "./QuickReplyButton";
import { SubmitType } from "@/hooks/useChatSubmit";
import { AnimatePresence, motion } from "framer-motion";

interface QuickReplyListProps {
  onSubmit?: (e?: SubmitType) => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function QuickReplyList({
  onSubmit,
  bottomRef,
}: QuickReplyListProps) {
  const { quickReplies, setQuickReplies } = useChatStore();

  if (quickReplies.length === 0) return null;

  const handleClick = (text: string) => {
    setQuickReplies([]);
    onSubmit?.({ type: "quick", text });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="quick-reply-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-[4.5rem] left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-7"
        style={{ backgroundColor: "transparent" }}>
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
        <div ref={bottomRef} />
      </motion.div>
    </AnimatePresence>
  );
}
