"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function PlanDetailHeader() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="relative flex h-12 items-center justify-center bg-white shadow-sm">
      <button className="absolute left-4" onClick={handleClick}>
        <ChevronLeft size={24} />
      </button>
      <span className="text-sm font-semibold">요금제 상세 정보</span>
    </div>
  );
}
