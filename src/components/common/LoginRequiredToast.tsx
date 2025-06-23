"use client";

import Image from "next/image";
import { toast } from "sonner";

interface Props {
  toastId: string | number;
  onLoginClick: () => void;
}

export default function LoginRequiredToast({ toastId, onLoginClick }: Props) {
  const handleClick = () => {
    onLoginClick();
    toast.dismiss(toastId);
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-[#3F3F46] px-4 py-3 shadow-md ring-1 ring-gray-300 transition hover:bg-[#4b4b51]">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-white">
          로그인이 필요한 페이지입니다.
        </span>
      </div>

      <button className="rounded-full bg-[#5A5A60] px-3 py-2 text-xs font-semibold whitespace-nowrap text-white">
        로그인
      </button>
    </div>
  );
}
