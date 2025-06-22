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
      onClick={() => router.push(`/chat`)}
      className="my-1 ml-1 flex w-full max-w-[21rem] cursor-pointer flex-col justify-center rounded-xl border border-gray-300 bg-[#FFF8F1] p-4 shadow-sm">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm font-semibold text-red-500">
          진행 중인 대화
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <NowChatProgressBar currentQuestionId={currentQuestionId} />
      </CardContent>
    </Card>
  );
}
