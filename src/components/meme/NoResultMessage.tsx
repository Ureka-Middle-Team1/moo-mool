import React from "react";
import { useRouter } from "next/navigation";

interface NoResultMessageProps {
  message?: string;
  subMessage?: string;
  buttonText?: string;
  buttonAction?: () => void;
  imageSrc?: string;
}

export default function NoResultMessage({
  message = "아직 테스트 결과가 없습니다!",
  subMessage = "테스트를 먼저 진행해주시면\n나와 닮은 무너를 확인할 수 있어요.",
  buttonText = "테스트 하러 가기",
  buttonAction,
  imageSrc = "/assets/moono/default-moono.png",
}: NoResultMessageProps) {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-pink-200 py-16">
      <img
        src={imageSrc}
        alt="무너"
        className="mb-6 h-32 w-32 animate-bounce"
      />
      <div className="flex flex-col items-center rounded-xl border border-pink-400 bg-white/80 px-8 py-6 shadow-lg">
        <p className="mb-2 text-lg font-semibold text-pink-400">{message}</p>
        <p className="mb-4 text-center whitespace-pre-line text-gray-700">
          {subMessage}
        </p>
        {buttonText && (
          <button
            onClick={buttonAction ?? (() => router.push("/meme-test"))}
            className="mt-2 rounded-lg bg-pink-400 px-6 py-2 font-bold text-white shadow transition hover:bg-yellow-500">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
