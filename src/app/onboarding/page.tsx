"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const slides = [
  {
    id: 1,
    title: "내게 딱 맞는 AI 요금제 추천",
    description: "복잡한 요금제,\nAI가 당신에게 꼭 맞는 걸 찾아드려요",
    highlight: "AI 요금제 추천",
    image: "/assets/icons/moomool_banner.png",
  },
  {
    id: 2,
    title: "나의 콘텐츠 성향은?",
    description: "영상부터 음악까지,\n당신의 취향을 반영한 요금제",
    highlight: "콘텐츠",
    image: "/assets/icons/moomool_banner.png",
  },
  {
    id: 3,
    title: "나의 콘텐츠 성향은?",
    description: "영상부터 음악까지,\n당신의 취향을 반영한 요금제",
    highlight: "콘텐츠",
    image: "/assets/icons/moomool_banner.png",
  },
  {
    id: 4,
    title: "나의 콘텐츠 성향은?",
    description: "영상부터 음악까지,\n당신의 취향을 반영한 요금제",
    highlight: "콘텐츠",
    image: "/assets/icons/moomool_banner.png",
  },
  {
    id: 5,
    title: "나의 콘텐츠 성향은?",
    description: "영상부터 음악까지,\n당신의 취향을 반영한 요금제",
    highlight: "콘텐츠",
    image: "/assets/icons/moomool_banner.png",
  },
];

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const parts = text.split(highlight);
  return (
    <>
      {parts[0]}
      <span className="text-red-500">{highlight}</span>
      {parts[1]}
    </>
  );
}

function MultilineText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

export default function onBoardingPage() {
  const [slideState, setSlideState] = useState({
    index: 0,
    direction: "right" as "left" | "right",
  });
  const router = useRouter();
  const currentSlide = slideState.index;
  const direction = slideState.direction;
  const isLastSlide = currentSlide === slides.length - 1;

  const { data: session } = useSession();
  const callbackUrl = "/home";

  const goToSlide = (nextIndex: number) => {
    setSlideState((prev) => ({
      index: nextIndex,
      direction: nextIndex > prev.index ? "right" : "left",
    }));
  };

  const handleLast = () => {
    if (slideState.index < slides.length - 1) {
      setSlideState((prev) => ({
        index: prev.index + 1,
        direction: "right",
      }));
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col justify-start bg-white">
      {/* 상단 이미지 */}
      <div className="relative h-[60%] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[currentSlide].id}
            src={slides[currentSlide].image}
            alt="slide"
            className="mask-gradient-blur h-full w-full rounded-b-[32px] object-cover"
            initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "right" ? -50 : 50 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* 텍스트 영역 */}
      <div className="mt-6 ml-6 flex flex-col gap-2 text-left">
        <p className="text-sm text-gray-800">
          <MultilineText text={slides[currentSlide].description} />
        </p>
        <h2 className="text-2xl leading-snug font-bold">
          <HighlightedText
            text={slides[currentSlide].title}
            highlight={slides[currentSlide].highlight}
          />
        </h2>
      </div>

      {/* 버튼 + 인디케이터 묶음 - 하단 고정 */}
      <div className="absolute bottom-8 left-0 w-full px-6">
        {/* 인디케이터 */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i === currentSlide ? "bg-black" : "bg-gray-300"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* 버튼 */}
        <div className="flex justify-center">
          <Button className="w-[70%]" onClick={handleLast}>
            {isLastSlide ? "시작하기" : "다음으로"}
          </Button>
        </div>
      </div>
    </div>
  );
}
