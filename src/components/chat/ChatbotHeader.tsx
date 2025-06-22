"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import HamburgerMenu from "../common/HamburgerMenu";
import StreamingText from "./StreamingChatTitleText";
import { useChatModeStore } from "@/store/useChatModeStore";
import { useSession } from "next-auth/react";

type HeaderProps = {
  title: string;
};

export default function Header({ title = "챗봇" }: HeaderProps) {
  const router = useRouter();
  const handleClick = async () => {
    router.back(); // 모든 작업 후에 뒤로가기
  };

  return (
    <div className="flex h-12 items-center justify-center bg-white">
      <Button className="absolute left-2" variant="ghost" onClick={handleClick}>
        <X size={20} />
      </Button>
      <div className="text-center text-sm font-semibold">
        {title === "챗봇" ? (
          title
        ) : (
          <StreamingText text={title} className="inline-block" />
        )}
      </div>
      <div className="absolute right-4">
        <HamburgerMenu />
      </div>
    </div>
  );
}
