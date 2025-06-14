// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import FloatingChatbotButton from "./FloatingChatbotButton";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 챗봇 버튼을 보여줄 경로 설정
  const visiblePaths = ["/", "/plandetail"];
  const shouldShowChatbot = visiblePaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="flex justify-center">
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-white">
        {children}
        {shouldShowChatbot && <FloatingChatbotButton />}
      </div>
    </div>
  );
}
