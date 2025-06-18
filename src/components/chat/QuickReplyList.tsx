"use client";

import { useChatStore } from "@/store/useChatStore";
import QuickReplyButton from "./QuickReplyButton";
import { SubmitType } from "@/hooks/useChatSubmit";
import { AnimatePresence, motion } from "framer-motion";

interface QuickReplyListProps {
  onSubmit?: (e?: SubmitType) => void;
}

export default function QuickReplyList({ onSubmit }: QuickReplyListProps) {
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
        className="w-full px-4 pb-2">
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
      </motion.div>
    </AnimatePresence>
  );
}
