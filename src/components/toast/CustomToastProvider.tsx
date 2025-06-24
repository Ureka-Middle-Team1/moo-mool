"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CustomToastContext = createContext<(msg: string) => void>(() => {});

export const useCustomToast = () => useContext(CustomToastContext);

export function CustomToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000); // 2초 후 사라짐
  };

  return (
    <CustomToastContext.Provider value={showToast}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            key="custom-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-12 left-1/2 z-[9999999] w-[min(65vw,370px)] -translate-x-1/2 transform overflow-visible rounded-full bg-gray-900/80 px-6 py-2 text-center text-[clamp(10px,3vw,16px)] whitespace-nowrap text-white shadow-lg"
            style={{ pointerEvents: "auto" }}>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </CustomToastContext.Provider>
  );
}
