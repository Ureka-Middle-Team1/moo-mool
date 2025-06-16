"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomeHeader() {
  return (
    <div className="w-full pt-2">
      <div className="flex items-center justify-between">
        {/* 좌측 로고 (Next Image) */}
        <img src="/assets/icons/logo.png" alt="logo" className="h-auto w-18" />

        {/* 우측 프로필 이미지 (ShadCN Avatar) */}
        <Avatar className="h-10 w-10 bg-gray-500">
          <AvatarImage
            src="/assets/moono/books-moono.png"
            alt="book-moono"
            className="scale-80 object-contain"
          />
          <AvatarFallback>🐤</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
