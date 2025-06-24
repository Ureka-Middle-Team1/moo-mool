import "./globals.css";
import "./fonts.css";
import { Metadata } from "next";
import Providers from "./providers";
import Script from "next/script";
import ClientLayout from "@/components/common/ClientLayout";
import { Toaster } from "sonner";
import { CustomToastProvider } from "@/components/toast/CustomToastProvider"; // ✅ 추가

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="m-0 h-full bg-gray-500 p-0">
        <Providers>
          <Toaster position="top-center" richColors /> {/* 기본 toast */}
          <CustomToastProvider>
            {" "}
            {/* ✅ 커스텀 toast용 provider */}
            <ClientLayout>{children}</ClientLayout>
          </CustomToastProvider>
        </Providers>

        {/* Google Analytics */}
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

        {/* Kakao SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
