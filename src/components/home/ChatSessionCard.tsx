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
      onClick={() => router.push(`/chat/${id}`)}
      className="mx-1 my-1 flex w-full max-w-[20rem] cursor-pointer flex-col justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
      <CardHeader className="p-0 pb-1">
        <CardTitle className="truncate text-sm font-semibold text-gray-900">
          {summary || "요약 없음"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-1">
        <p className="truncate text-xs text-gray-600">
          {name || "요금제 제목 없음"}
        </p>
      </CardContent>
    </Card>
  );
}
