"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./fonts.css";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center bg-gray-500 antialiased">
        <SessionProvider>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
