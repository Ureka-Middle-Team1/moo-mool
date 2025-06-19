"use client";

import Image from "next/image";

export default function PlanListHeader() {
  return (
    <div className="sticky top-0 z-50 h-14 w-full bg-transparent shadow-none">
      <div className="relative flex h-full items-center justify-center">
        <span className="text-base font-semibold">요금제 목록</span>

        <div className="absolute left-4 flex items-center">
          <Image
            src="/assets/icons/logo.png"
            alt="로고"
            width={36}
            height={36}
          />
        </div>
      </div>
    </div>
  );
}
