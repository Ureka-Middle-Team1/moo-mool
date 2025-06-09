"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./fonts.css";
import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center antialiased">
        <SessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
