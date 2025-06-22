// "입력 중" 애니메이션 표시를 위한 타이핑 애니메이션
"use client";

import { motion } from "framer-motion";

export default function ChatMessageTyping() {
  return (
    <motion.div
      key="typing"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      layout
      className="mb-3 flex items-start justify-end gap-2">
      <div className="max-w-[75%] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#FFF3B0] px-5 py-3 text-sm shadow-md">
        <div className="flex gap-1">
          {[0, 0.2, 0.4].map((delay, idx) => (
            <motion.span
              key={idx}
              className="h-2 w-2 rounded-full bg-black"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                delay,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
