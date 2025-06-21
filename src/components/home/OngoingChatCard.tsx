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
      className="w-[12rem] flex-shrink-0 cursor-pointer flex-col justify-center rounded-xl border border-gray-300 bg-white px-1 py-3 shadow-sm"
      onClick={() => router.push(`/chat`)}>
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-pink-700">
          진행 중인 대화
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NowChatProgressBar currentQuestionId={currentQuestionId} />
      </CardContent>
    </Card>
  );
}
