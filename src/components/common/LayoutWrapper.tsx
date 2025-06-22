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
  const isChatPage = pathname?.startsWith("/chat");

  // 챗봇 버튼을 보여줄 경로 설정
  const visiblePathPatterns = [/^\/plandetail/, /^\/home/, /^\/chat\/[^/]+$/];
  const shouldShowChatbot = visiblePathPatterns.some((pattern) =>
    pattern.test(pathname)
  );

  return (
    <div className="flex justify-center">
      <div
        className={`relative flex w-full max-w-[430px] flex-col bg-white ${
          isChatPage ? "h-screen" : "min-h-screen"
        }`}>
        {children}
        {shouldShowChatbot && <FloatingChatbotButton />}
      </div>
    </div>
  );
}
