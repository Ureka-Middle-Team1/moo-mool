"use client";

import { ChatSessionCardSkeleton } from "../skeleton/ChatSessionCardSkeleton";
import { Carousel, CarouselContent } from "../ui/carousel";

export default function ChatHistoryListSkeleton() {
  return (
    <section className="flex w-full flex-col items-center px-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="-ml-4 flex-nowrap space-x-4 px-5 py-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <ChatSessionCardSkeleton key={`skeleton-${i}`} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
