"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

interface ChatSessionCardProps {
  id: number;
  summary?: string;
  name?: string;
}

export function ChatSessionCard({ id, summary, name }: ChatSessionCardProps) {
  const router = useRouter();

  return (
    <Card
      className="w-[13rem] flex-shrink-0 cursor-pointer flex-col justify-center rounded-xl border border-gray-300 bg-white p-3 shadow-sm transition hover:shadow-md"
      onClick={() => router.push(`/chat/${id}`)}>
      <CardHeader className="pb-1">
        <CardTitle className="line-clamp-2 truncate text-sm font-medium text-zinc-800">
          💬 {summary || "요약 없음"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <p className="line-clamp-2 truncate text-xs font-normal text-zinc-600">
          📌 {name || "요금제 제목 없음"}
        </p>
      </CardContent>
    </Card>
  );
}
