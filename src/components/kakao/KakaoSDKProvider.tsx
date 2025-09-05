"use client";

import Script from "next/script";

export default function KakaoSDKProvider() {
  const handleLoad = () => {
    const w = window as any;
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_CLIENT_ID!);
    }
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}
