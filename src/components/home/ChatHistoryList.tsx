import { useGetRecentChatSessions } from "@/hooks/useGetRecentChatSessions";
import { useSession } from "next-auth/react";
import { useChatStore } from "@/store/useChatStore";
import { Carousel, CarouselContent } from "../ui/carousel";
import { OngoingChatCard } from "./OngoingChatCard";
import { ChatSessionCard } from "./ChatSessionCard";
import { ChatSessionCardSkeleton } from "../skeleton/ChatSessionCardSkeleton";

export default function ChatHistoryList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // 🧠 userId가 준비되기 전에도 skeleton 먼저 보여주기
  const {
    data: sessions,
    isLoading,
    isFetching,
  } = useGetRecentChatSessions(userId ?? "");

  const { messages, currentQuestionId } = useChatStore();

  const shouldShowProgress = currentQuestionId > 0 && messages.length >= 2;

  const loading = !userId || isLoading || isFetching;

  return (
    <section className="ml-5 flex flex-col items-center px-4 pl-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="flex-nowrap space-x-4 px-5 py-5">
          {/* ✅ 진행 중인 대화 카드 조건 분기 */}
          {shouldShowProgress &&
            (loading ? (
              <ChatSessionCardSkeleton />
            ) : (
              <OngoingChatCard currentQuestionId={currentQuestionId} />
            ))}

          {/* ✅ 세션 카드 목록 or 스켈레톤 */}
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ChatSessionCardSkeleton key={`skeleton-${i}`} />
              ))
            : sessions?.map((s, idx) => (
                <ChatSessionCard
                  key={idx}
                  id={s.id}
                  summary={s.summary || JSON.parse(s.messages)?.[0]?.content}
                  name={s.name}
                />
              ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
