"use client";

import { Share2, Link } from "lucide-react";

interface ShareSectionProps {
  title: string;
  count: number;
}

import React from "react";

export default function ShareSection({ title, count }: ShareSectionProps) {
  return (
    <>
      <div className="mb-2 flex w-[90%] items-center justify-center gap-2">
        <p className="text-[15px] text-black">{title}</p>
        <div className="flex items-center gap-1">
          <Share2 className="h-[15px] w-[15px] text-black" />
          <p className="text-[15px] font-medium text-black">{count}</p>
        </div>
      </div>
      <div className="mb-3 flex gap-2">
        {/* 메시지 버튼 */}
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-pink-400 shadow-xl hover:bg-yellow-500">
          <img
            src="/assets/icons/message-circle.png"
            className="h-5 w-5"
            alt="message"
          />
        </div>

        {/* 링크 버튼 */}
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-pink-400 shadow-xl hover:bg-yellow-500">
          <Link className="h-5 w-5 text-white" />
        </div>
      </div>
    </>
  );
}
