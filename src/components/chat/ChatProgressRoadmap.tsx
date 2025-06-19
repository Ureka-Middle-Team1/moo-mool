"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ChatProgressToastProps {
  currentQuestionId: number; // 1~12
  totalSteps?: number;
}

const stepKeywords: { [key: number]: string } = {
  1: "unlimited",
  2: "streaming",
  3: "need",
  4: "data",
  5: "shortage",
  6: "wifi",
  7: "call/sms",
  8: "age",
  9: "network",
  10: "contract",
  11: "subscription",
};

export default function ChatProgressToast({
  currentQuestionId,
  totalSteps = 11,
}: ChatProgressToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prevId, setPrevId] = useState<number | null>(null);

  useEffect(() => {
    if (currentQuestionId === 1 || currentQuestionId === 12) {
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
    const waveHeight = 25;
    const frequency = 3;
    const y =
      Math.sin((index / (totalSteps - 1)) * Math.PI * frequency) * waveHeight;
    const easedY =
      y * Math.pow(Math.sin((index / (totalSteps - 1)) * Math.PI), 0.6);
    return { x, y: easedY };
  };

  const generateWavePath = () => {
    let path = "";
    for (let i = 0; i < totalSteps; i++) {
      const pos = getStepPosition(i);
      if (i === 0) {
        path += `M ${pos.x} ${50 + pos.y}`;
      } else {
        const prevPos = getStepPosition(i - 1);
        const cp1x = prevPos.x + (pos.x - prevPos.x) * 0.5;
        const cp1y = 50 + prevPos.y;
        const cp2x = prevPos.x + (pos.x - prevPos.x) * 0.5;
        const cp2y = 50 + pos.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pos.x} ${50 + pos.y}`;
      }
    }
    return path;
  };

  const generateCompletedPath = () => {
    if (currentQuestionId <= 1) return "";
    let path = "";
    const completedSteps = Math.min(currentQuestionId - 1, totalSteps);
    for (let i = 0; i < completedSteps; i++) {
      const pos = getStepPosition(i);
      if (i === 0) {
        path += `M ${pos.x} ${50 + pos.y}`;
      } else {
        const prevPos = getStepPosition(i - 1);
        const cp1x = prevPos.x + (pos.x - prevPos.x) * 0.5;
        const cp1y = 50 + prevPos.y;
        const cp2x = prevPos.x + (pos.x - prevPos.x) * 0.5;
        const cp2y = 50 + pos.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pos.x} ${50 + pos.y}`;
      }
    }
    return path;
  };

  if (currentQuestionId === 0 || currentQuestionId === 12) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="relative rounded-2xl border border-gray-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm"
            initial={{ y: -60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}>
            <div className="relative mb-4 h-32">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none">
                <path
                  d={generateWavePath()}
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <motion.path
                  d={generateCompletedPath()}
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>

              {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                (step) => {
                  const position = getStepPosition(step - 1);
                  const isCompleted = step < currentQuestionId;

                  return (
                    <div
                      key={step}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                      style={{
                        left: `${position.x}%`,
                        top: `${50 + position.y}%`,
                      }}>
                      {isCompleted ? (
                        <motion.div
                          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-transparent bg-gradient-to-br from-yellow-300 to-pink-400 shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}>
                          <motion.div
                            className="h-2 w-2 rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        </motion.div>
                      ) : null}

                      <motion.div
                        className={`absolute top-8 left-1/2 -translate-x-1/2 transform text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
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
