import { useGetRecentChatSessions } from "@/hooks/useGetRecentChatSessions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useChatStore } from "@/store/useChatStore";
import { NowChatProgressBar } from "./NowChatProgressBar";

export default function ChatHistoryList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: sessions } = useGetRecentChatSessions(userId);
  const { messages, currentQuestionId } = useChatStore(); // ChatStore에 있는 메시지들 불러오기

  const shouldShowProgress = currentQuestionId > 0 && messages.length >= 2;

  const router = useRouter();
  console.log(sessions);
  return (
    <section className="flex w-full flex-col items-center px-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="-ml-4 flex-nowrap space-x-4 px-5 py-5">
          {/* ✅ 진행중 카드 (맨 앞에 하나만 조건부 렌더링) */}
          {shouldShowProgress && (
            <Card
              className="min-w-full flex-shrink-0 flex-col justify-center rounded-xl bg-white shadow-md"
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
          )}
          {sessions?.map((s, idx) => (
            <Card
              key={idx}
              className="min-w-full flex-shrink-0 cursor-pointer flex-col justify-center rounded-xl bg-white shadow-md"
              onClick={() => router.push(`/chat/${s.id}`)}>
              {/* 해당 Section은 "AI 요약 제목"을 띄울 것임 */}
              <CardHeader>
                <CardTitle className="truncate text-base font-semibold">
                  {s.summary || JSON.parse(s.messages)?.[0]?.content}
                </CardTitle>
              </CardHeader>
              {/* 해당 Section은 "추천받은 요금제 이름"을 띄울 것임 */}
              <CardContent>
                <p className="line-clamp-2 text-sm text-gray-700">
                  {s.name || "요금제 제목 없음"}
                </p>
              </CardContent>
            </Card>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
