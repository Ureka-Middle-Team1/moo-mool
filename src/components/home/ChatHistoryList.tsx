import { useGetRecentChatSessions } from "@/hooks/useGetRecentChatSessions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ChatHistoryList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: sessions } = useGetRecentChatSessions(userId);
  const router = useRouter();
  console.log(sessions);
  return (
    <section className="flex w-full flex-col items-center px-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="-ml-4 flex-nowrap space-x-4 px-5 py-5">
          {sessions?.map((s) => (
            <Card
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
