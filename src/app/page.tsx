"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "무너에게 물어보세요",
  "무엇이든 물어보세요",
  "당신을 위한 요금제",
];

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    signIn("kakao", { callbackUrl: "/check-user-type" });
  };

  const handleExplore = () => {
    router.push("/onboarding");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#fff5f9] to-[#fdfbfb] px-6">
      {/* 중앙 로고 + 문구 */}
      <div className="mt-48 flex flex-col items-center justify-center gap-4">
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

        <div className="h-6 overflow-hidden text-center text-sm text-gray-500">
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

      {/* 하단 버튼 */}
      <div className="mb-10 flex w-full max-w-xs flex-col gap-3">
        {!session && (
          <Button
            onClick={handleLogin}
            className="h-12 rounded-lg bg-black text-white hover:bg-zinc-800">
            카카오로 시작하기
          </Button>
        )}
        <Button
          onClick={handleExplore}
          variant="outline"
          className="h-12 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100">
          둘러보기
        </Button>
      </div>
    </div>
  );
}
