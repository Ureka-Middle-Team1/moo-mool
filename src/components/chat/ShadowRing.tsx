"use client";

import { motion } from "framer-motion";

interface ShadowRingProps {
  isActive: boolean;
  color?: string; // 기본 색상
  blurStrength?: string; // blur-2xl 같은 클래스
  baseSize?: number; // rem 단위 크기
  offsetBottom?: string; // 예: '6rem'
}

export default function ShadowRing({
  isActive,
  color = "bg-pink-400",
  blurStrength = "blur-2xl",
  baseSize = 8, // 기본: 8rem
  offsetBottom = "6rem",
}: ShadowRingProps) {
  if (!isActive) return null;

  const layers = [
    { scale: 1, delay: 0 },
    { scale: 0.8, delay: 0.3 },
    { scale: 0.6, delay: 0.6 },
  ];

  return (
    <>
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className={`absolute left-1/2 -translate-x-1/2 rounded-full ${color} ${blurStrength}`}
          style={{
            width: `${baseSize * layer.scale}rem`,
            height: `${(baseSize / 2.5) * layer.scale}rem`,
            bottom: offsetBottom,
            opacity: 0.5,
          }}
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
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
