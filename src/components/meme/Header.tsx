"use client";

import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";

export default function Header({ onBack }: { onBack: () => void }) {
  return (
    <header className="sticky top-0 z-100 flex h-12 w-full items-center justify-between bg-yellow-200 px-4">
      <div className="flex items-center">
        <ChevronLeft onClick={onBack} className="h-5 w-5 cursor-pointer" />
      </div>
      <div
        style={{ fontFamily: "kkubulim" }}
        className="font-nomal flex flex-1 items-center justify-center space-x-1">
        <span>콘텐츠 과몰입 테스트</span>
        <X className="h-3 w-3" />
        <Image
          src="/assets/icons/U_plus.png"
          alt="U+ 로고"
          width={20}
          height={16}
          className="object-contain"
        />
      </div>
      <div className="h-5 w-5" />
    </header>
  );
}
