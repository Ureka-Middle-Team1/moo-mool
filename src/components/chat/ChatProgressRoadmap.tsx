"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ChatProgressToastProps {
  currentQuestionId: number; // 1~12
  totalSteps?: number;
}

const stepKeywords: { [key: number]: string } = {
  1: "", // "무제한",
  2: "스트리밍",
  3: "무제한",
  4: "", //"현재 데이터",
  5: "데이터",
  6: "와이파이",
  7: "전화/문자",
  8: "나이",
  9: "속도",
  10: "약정",
  11: "구독",
};

export default function ChatProgressToast({
  currentQuestionId,
  totalSteps = 11,
}: ChatProgressToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prevId, setPrevId] = useState<number | null>(null);

  useEffect(() => {
    if (currentQuestionId === 0 || currentQuestionId === 12) {
      setIsVisible(false);
      return;
    }

    if (currentQuestionId !== prevId && currentQuestionId <= 11) {
      setPrevId(currentQuestionId);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentQuestionId]);

  const getStepPosition = (index: number) => {
    const totalWidth = 100;
    const x = (index / (totalSteps - 1)) * totalWidth;
    return { x };
  };

  if (currentQuestionId === 0 || currentQuestionId === 12) return null;

  const completedId = currentQuestionId - 1;

  // 진행률 계산 (음수 방지)
  const progressPercentage =
    completedId > 0 ? ((completedId - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="pointer-events-none fixed top-14 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="relative rounded-2xl border border-gray-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm"
            initial={{ y: -60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <div className="relative mb-4 h-8">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200">
                <div
                  className="h-1 rounded-full bg-pink-300 transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              </div>

              {/* Step Circles */}
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                (step) => {
                  const position = getStepPosition(step - 1);
                  const isCompleted = step < currentQuestionId;
                  const isLastCompleted = step === completedId;

                  return (
                    <div
                      key={step}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                      style={{ left: `${position.x}%`, top: "50%" }}>
                      {isCompleted && (
                        <motion.div
                          className={`flex h-4 w-4 items-center justify-center rounded-full border-2 shadow-md transition-colors duration-300 ${
                            isLastCompleted
                              ? "border-white bg-pink-300"
                              : "border-gray-300 bg-pink-100"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}>
                          <motion.div
                            className="h-1.5 w-1.5 rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        </motion.div>
                      )}

                      <motion.div
                        className={`absolute top-6 left-1/2 -translate-x-1/2 transform text-[8px] font-medium whitespace-nowrap transition-colors duration-300 ${
                          isCompleted ? "text-gray-700" : "text-gray-400"
                        }`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}>
                        {stepKeywords[step]}
                      </motion.div>
                    </div>
                  );
                }
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
