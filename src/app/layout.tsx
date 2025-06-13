"use client";

import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Providers from "./providers";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="m-0 h-full bg-gray-500 p-0">
        <SessionProvider>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
