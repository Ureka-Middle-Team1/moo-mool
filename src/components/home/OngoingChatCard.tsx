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
      className="w-[17rem] flex-shrink-0 flex-col justify-center rounded-xl bg-white shadow-md"
      onClick={() => router.push(`/chat`)}>
      <CardHeader>
        <CardTitle className="truncate text-base font-semibold text-pink-600">
          진행 중인 대화
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NowChatProgressBar currentQuestionId={currentQuestionId} />
      </CardContent>
    </Card>
  );
}
