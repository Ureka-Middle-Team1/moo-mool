"use client";

interface BottomGradientProps {
  show: boolean;
}

export default function BottomGradient({ show }: BottomGradientProps) {
  return (
    <div
      className={`h-[300px] w-full transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(to top, #ffe4e8, transparent)",
      }}
    />
  );
}
