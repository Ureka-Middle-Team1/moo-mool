"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
// import LoadingPage from "@/components/common/LoadingPage";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import GlobalLoading from "./loading";

const phrases = [
  "무너에게 물어보세요",
  "무엇이든 물어보세요",
  "당신을 위한 요금제",
];

export default function Home() {
  const router = useRouter();
  const { status, isLoading, isAuthenticated } = useAuthRedirect();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogin = () => {
    // 리다이렉트 경로가 있으면 로그인 후 해당 페이지로 이동
    signIn("kakao", { callbackUrl: "/home" });
  };

  const handleExplore = () => {
    router.push("/home");
  };

  const tmp = () => {
    console.log("랜딩페이지 무너 클릭");
  };

  // 로딩 중이거나 인증된 사용자는 로딩 페이지 표시
  if (isLoading || isAuthenticated) {
    return <GlobalLoading />;
  }

  return (
    <div className="relative flex h-screen flex-col items-center bg-gradient-to-b from-[#fff1e5] to-[#ffe5f1] px-4">
      {/* 중앙 로고 + 문구 */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            <Image
              src="/assets/icons/logo.png"
              alt="무물 로고"
              width={120}
              height={120}
              priority
            />
          </motion.div>

          <div className="h-6 overflow-hidden text-center text-sm text-gray-700">
            <AnimatePresence mode="wait">
              <motion.p
                key={phrases[currentIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="px-2">
                {phrases[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mb-5 flex w-full max-w-xs flex-col gap-3">
        <Button
          onClick={handleLogin}
          className="h-12 rounded-lg bg-[#FEE500] text-gray-800 shadow-md">
          카카오로 시작하기
        </Button>

        <button
          onClick={handleExplore}
          className="cursor-pointer text-sm text-gray-700">
          {">"} 로그인 없이 둘러보기
        </button>
      </div>
    </div>
  );
}
