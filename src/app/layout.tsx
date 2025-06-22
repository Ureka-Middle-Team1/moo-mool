import "./globals.css";
import "./fonts.css";
import Providers from "./providers";
import Script from "next/script";
import ClientLayout from "@/components/common/ClientLayout";

export const metadata = {
  title: "무물",
  description: "나에게 딱 맞는 요금제, 재미있게 찾는 방법",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta property="og:title" content="무물" />
        <meta
          property="og:description"
          content="나에게 딱 맞는 요금제, 재미있게 찾는 방법"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moo-mool.com" />
        <meta
          property="og:image"
          content="https://moo-mool.com/assets/banner/moomool_meta.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="무물 미리보기 이미지" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="무물" />
        <meta
          name="twitter:description"
          content="나에게 딱 맞는 요금제, 재미있게 찾는 방법"
        />
        <meta
          name="twitter:image"
          content="https://moo-mool.com/assets/banner/moomool_meta.png"
        />

        {/* 필수 스크립트 */}
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
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="m-0 h-full bg-gray-500 p-0">
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
