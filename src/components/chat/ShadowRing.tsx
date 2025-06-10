"use client";
import { motion } from "framer-motion";

export default function ShadowRing({ isSpeaking }: { isSpeaking: boolean }) {
  if (!isSpeaking) return null;

  const layers = [
    { size: "w-[12rem] h-[3.5rem]", delay: 0 },
    { size: "w-[10rem] h-[3rem]", delay: 0.3 },
    { size: "w-[8rem] h-[2.5rem]", delay: 0.6 },
  ];

  return (
    <>
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-pink-400 blur-2xl ${layer.size}`}
          style={{ bottom: "11rem" }}
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0],
          }}
          transition={{
            duration: 1.8,
            delay: layer.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
