import { useGetRecentChatSessions } from "@/hooks/useGetRecentChatSessions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card } from "../ui/card";

export default function ChatHistoryList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: sessions } = useGetRecentChatSessions(userId);
  const router = useRouter();
  console.log(sessions);
  return (
    <section className="flex w-full flex-col items-center px-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="-ml-4 px-5 py-5">
          {sessions?.map((s) => (
            <CarouselItem
              key={s.id}
              className="flex basis-[95%] justify-center pl-4">
              <Card
                key={s.id}
                className="flex basis-[95%] justify-center pl-4"
                onClick={() => router.push(`/chat/${s.id}`)}>
                {s.summary || JSON.parse(s.messages)?.[0]?.content}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
