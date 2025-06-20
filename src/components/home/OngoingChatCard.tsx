"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { NowChatProgressBar } from "./NowChatProgressBar";

interface OngoingChatCardProps {
  currentQuestionId: number;
}

export function OngoingChatCard({ currentQuestionId }: OngoingChatCardProps) {
  const router = useRouter();

  return (
    <Card
      className="w-[13.5rem] flex-shrink-0 cursor-pointer rounded-2xl border border-gray-300 bg-white p-2 py-3 shadow-sm transition hover:shadow-md"
      onClick={() => router.push(`/chat`)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-pink-500">
          진행 중인 대화
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NowChatProgressBar currentQuestionId={currentQuestionId} />
      </CardContent>
    </Card>
  );
}
