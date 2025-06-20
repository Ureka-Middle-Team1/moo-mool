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
      className="w-[16rem] min-w-full flex-shrink-0 cursor-pointer flex-col justify-center rounded-2xl border border-gray-400 bg-white shadow-sm transition hover:shadow-md"
      onClick={() => router.push(`/chat/${id}`)}>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-base font-semibold text-zinc-800">
          {summary || "요약 없음"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <p className="line-clamp-2 text-sm font-medium text-zinc-600">
          📌 {name || "요금제 제목 없음"}
        </p>
      </CardContent>
    </Card>
  );
}
