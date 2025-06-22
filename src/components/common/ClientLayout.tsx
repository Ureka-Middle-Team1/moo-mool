"use client";
import { usePathname } from "next/navigation";
import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSwagger = pathname?.startsWith("/swagger");
  return isSwagger ? (
    <>{children}</>
  ) : (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
}
