import React, { useEffect, useState } from "react";

const moonoImages = [
  "/assets/moono/youtube-moono.png",
  "/assets/moono/sns-moono.png",
  "/assets/moono/saving-moono.png",
  "/assets/moono/default-moono.png",
  "/assets/moono/chat-moono.png",
  "/assets/moono/calling-moono.png",
  "/assets/moono/books-moono.png",
];

export default function LoadingScreen({
  message = "제출 중입니다...",
}: {
  message?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % moonoImages.length);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="from-pink-60 flex h-screen flex-col items-center justify-center bg-gradient-to-b via-pink-200 to-pink-100">
      <div className="relative mb-10 flex items-center justify-center">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-pink-200 opacity-40 blur-2xl" />
        <img
          src={moonoImages[index]}
          alt="moono"
          className="z-10 h-35 w-35 animate-bounce rounded-full border-4 border-pink-300 object-contain shadow-2xl"
        />
      </div>
      <div className="mb-3 animate-pulse text-2xl font-extrabold drop-shadow">
        {message}
      </div>
      <div className="mt-2 text-lg tracking-wide opacity-100 transition-opacity duration-700">
        나와 닮은 <span className="font-bold">무너</span>
        는...?!
      </div>
    </div>
  );
}
