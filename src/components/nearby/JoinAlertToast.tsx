"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/nearby/use-toast";

interface Props {
  toastId: string | number;
}

export default function JoinAlertToast({ toastId }: Props) {
  const router = useRouter();
  const { dismiss } = useToast();

  const handleClick = () => {
    dismiss(toastId); // 토스트 닫기
    router.push("/nearby");
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full max-w-sm cursor-pointer items-center justify-between gap-4 rounded-xl bg-[#3F3F46] px-4 py-3 shadow-md ring-1 ring-gray-300 transition hover:bg-[#4b4b51]">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/moono/default-moono.png"
          alt="logo"
          width={28}
          height={28}
          className="rounded-full"
        />
        <span className="text-sm font-semibold text-white">
          근처에 함께 무물을 켠 사람이 있어요.
        </span>
      </div>

      <button className="rounded-full bg-[#5A5A60] px-3 py-2 text-xs font-semibold whitespace-nowrap text-white">
        스탬프 적립
      </button>
    </div>
  );
}
