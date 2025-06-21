"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import HamburgerMenu from "../common/HamburgerMenu";
import { useChatStore } from "@/store/useChatStore";
import { usePostChatbotSummary } from "@/hooks/usePostChatbotSummary";
import { useSession } from "next-auth/react";
import { useFreeTalkStore } from "@/store/useFreeTalkStore";
import { useTendencyStore } from "@/store/useTendencyStore";

type HeaderProps = {
  title: string;
  onAvatarClick: () => void;
};

export default function Header({ title = "챗봇", onAvatarClick }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isVoiceMode = mode === "voice";

  const { data: session } = useSession(); // 로그인 정보 가져오기
  const { messages } = useChatStore();
  const { resetTendency } = useTendencyStore();
  const {
    setCurrentQuestionId,
    setHasRecommended,
    currentQuestionId,
    hasRecommended,
    clearMessages,
  } = useChatStore(); // 현재 questionId를 이용해서 챗봇에서 현재 상태 판단
  const { clear } = useFreeTalkStore();
  const { mutate: chatHistorySummary } = usePostChatbotSummary();

  const handleClick = async () => {
    if (isVoiceMode) {
      router.push("/chat");
    } else {
      if (currentQuestionId === 12 && hasRecommended) {
        if (!session?.user?.id) return;

        const currentMessages = useChatStore.getState().messages;
        const lastBotMsg = currentMessages
          .reverse()
          .find((m) => m.role === "bot");
        const planId = lastBotMsg?.planData?.id ?? 5;

        try {
          // 모든 작업 순차적으로 수행
          await chatHistorySummary({
            userId: session.user.id,
            messages,
            planId,
          });
          setCurrentQuestionId(0);
          setHasRecommended(false);
          clearMessages();
          clear();
          resetTendency();

          // 모든 작업 후에 뒤로가기
          router.back();
        } catch (error) {
          console.error("chatHistorySummary 실패:", error);
        }
      } else {
        // 조건을 만족하지 않는 경우엔 그냥 뒤로 가기
        router.back();
      }
    }
  };

  return (
    <div className="relative flex h-12 items-center justify-center bg-white/80 backdrop-blur-md">
      <Button className="absolute left-2" variant="ghost" onClick={handleClick}>
        {isVoiceMode ? <ArrowLeft size={20} /> : <X size={20} />}
      </Button>
      <div className="text-center text-sm font-semibold">{title}</div>
      <div className="absolute right-4">
        <HamburgerMenu onAvatarClick={onAvatarClick} />
      </div>
    </div>
  );
}
