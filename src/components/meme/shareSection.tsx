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
      <div className="mb-6 flex gap-4">
        {/* 메시지 버튼 */}
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-pink-400 shadow-xl hover:bg-yellow-500">
          <img
            src="/assets/icons/message-circle.png"
            className="h-6 w-6"
            alt="message"
          />
        </div>

        {/* 링크 버튼 */}
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-pink-400 shadow-xl hover:bg-yellow-500">
          <Link className="h-6 w-6 text-white" />
        </div>
      </div>
    </>
  );
}
