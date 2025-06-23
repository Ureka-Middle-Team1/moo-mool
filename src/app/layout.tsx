import "./globals.css";
import "./fonts.css";
import { Metadata } from "next";
import Providers from "./providers";
import Script from "next/script";
import ClientLayout from "@/components/common/ClientLayout";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "무물",
  description: "나에게 딱 맞는 요금제, 재미있게 찾는 방법",
  openGraph: {
    title: "무물",
    description: "나에게 딱 맞는 요금제, 재미있게 찾는 방법",

    url: "https://moo-mool.com",
    type: "website",
    images: [
      {
        url: "https://moo-mool.com/assets/banner/moomool_meta.png",
        width: 1200,
        height: 630,
        alt: "무물 미리보기 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "무물",
    description: "나에게 딱 맞는 요금제, 재미있게 찾는 방법",
    images: ["https://moo-mool.com/assets/banner/moomool_meta.png"],
  },
  metadataBase: new URL("https://moo-mool.com"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="m-0 h-full bg-gray-500 p-0">
        <Providers>
          <Toaster position="top-center" richColors />
          <ClientLayout>{children}</ClientLayout>
        </Providers>

        {/* 구글 애널리틱스 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BVLC61P00M"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BVLC61P00M', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
