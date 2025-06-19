"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import HamburgerMenu from "../common/HamburgerMenu";
import { useChatStore } from "@/store/useChatStore";
import { usePostChatbotSummary } from "@/hooks/usePostChatbotSummary";
import { useSession } from "next-auth/react";

type HeaderProps = {
  title: string;
};

export default function Header({ title = "챗봇" }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isVoiceMode = mode === "voice";

  const { data: session } = useSession(); // 로그인 정보 가져오기
  const { messages } = useChatStore();
  const {
    setCurrentQuestionId,
    setHasRecommended,
    currentQuestionId,
    hasRecommended,
  } = useChatStore(); // 현재 questionId를 이용해서 챗봇에서 현재 상태 판단
  const { mutate: chatHistorySummary } = usePostChatbotSummary();

  const handleClick = () => {
    if (isVoiceMode) {
      router.push("/chat");
    } else {
      if (currentQuestionId === 12 && hasRecommended) {
        if (!session?.user?.id) return;

        // "텍스트 모드"에서 결과 추천까지 받은 상태에서, 뒤로 가기 버튼 눌렀을 경우
        chatHistorySummary({ userId: session?.user.id, messages }); // 요약 수행하고 저장소에 저장
        setCurrentQuestionId(0);
        setHasRecommended(false);
      }
      router.back();
    }
  };

  return (
    <div className="relative flex h-12 items-center justify-center bg-white">
      <Button className="absolute left-2" variant="ghost" onClick={handleClick}>
        {isVoiceMode ? <ArrowLeft size={20} /> : <X size={20} />}
      </Button>
      <div className="text-center text-sm font-semibold">{title}</div>
      <div className="absolute right-4">
        <HamburgerMenu />
      </div>
    </div>
  );
}
