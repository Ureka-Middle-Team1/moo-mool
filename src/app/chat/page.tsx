"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUp, Mic } from "lucide-react";
import Header from "@/components/common/Header";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function ChatbotPage() {
  return (
    <div className="flex h-screen flex-col bg-[#FFF8F8]">
      <Header />
    </div>
  );
}
