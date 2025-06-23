"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import { useChatRoomExitCleanup } from "@/hooks/useChatRoomExitCleanup";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isSwagger = pathname?.startsWith("/swagger");

  useChatRoomExitCleanup(); // 채팅창에서 다른 페이지로 벗어날 때 초기화하는 로직 수행

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return isSwagger ? (
    <>{children}</>
  ) : (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
}
