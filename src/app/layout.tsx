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
      <body className="m-0 bg-gray-100 p-0">
        <SessionProvider>
          <div className="flex h-full justify-center bg-gray-500">
            <div className="relative h-screen w-full max-w-[393px] bg-pink-200">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
