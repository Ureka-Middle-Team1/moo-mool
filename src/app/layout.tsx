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
        <div className="flex min-h-screen justify-center bg-gray-100">
          <div className="relative h-screen w-full max-w-[393px] bg-pink-200">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
