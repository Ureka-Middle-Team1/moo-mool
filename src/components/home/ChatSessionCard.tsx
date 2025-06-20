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
      className="min-w-full flex-shrink-0 cursor-pointer flex-col justify-center rounded-xl bg-white shadow-md"
      onClick={() => router.push(`/chat/${id}`)}>
      <CardHeader>
        <CardTitle className="truncate text-base font-semibold">
          {summary || "요약 없음"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-gray-700">
          {name || "요금제 제목 없음"}
        </p>
      </CardContent>
    </Card>
  );
}
