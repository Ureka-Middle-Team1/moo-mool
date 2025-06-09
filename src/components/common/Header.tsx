"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isVoiceMode = mode === "voice";

  const handleClick = () => {
    if (isVoiceMode) {
      router.push("/chat");
    } else {
      router.back();
    }
  };

  const title = "챗봇";

  return (
    <div className="relative flex h-12 items-center justify-center bg-white">
      <button className="absolute left-4" onClick={handleClick}>
        {isVoiceMode ? <ArrowLeft size={20} /> : <X size={20} />}
      </button>
      <span className="text-center text-sm font-semibold">{title}</span>
    </div>
  );
}
