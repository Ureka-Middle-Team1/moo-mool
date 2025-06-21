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
      className="w-[12rem] flex-shrink-0 cursor-pointer flex-col justify-center rounded-xl border border-gray-300 bg-white px-1 py-3 shadow-sm"
      onClick={() => router.push(`/chat/${id}`)}>
      <CardHeader>
        <CardTitle className="truncate text-sm font-medium text-gray-900">
          {summary || "요약 없음"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="truncate text-xs font-normal text-gray-700">
          {name || "요금제 제목 없음"}
        </p>
      </CardContent>
    </Card>
  );
}
