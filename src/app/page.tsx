"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
// import LoadingPage from "@/components/common/LoadingPage";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "무너에게 물어보세요",
  "무엇이든 물어보세요",
  "당신을 위한 요금제",
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, isLoading, isAuthenticated } = useAuthRedirect();
  const [redirectPath, setRedirectPath] = useState("");
  const hasShownToast = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const redirect = searchParams.get("redirect");

    if (status === "unauthenticated" && redirect && !hasShownToast.current) {
      hasShownToast.current = true;
      setRedirectPath(redirect);

      /*    // sonner 겹침 방지 위해 임시 주석처리
      // Toaster가 완전히 마운트될 때까지 약간의 지연
      setTimeout(() => {
        try {
          toast.warning("로그인이 필요한 페이지입니다.", {
            // id: "login-required", // 고유 ID로 중복 방지
            // action: {
            //   label: "로그인하기",
            //   onClick: () => handleLogin(),
            // },
            duration: 3000,
          });
        } catch (error) {
          console.error("Toast 표시 실패:", error);
        }
      }, 100); // 100ms 지연
*/
      // URL에서 파라미터 제거
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("redirect");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams]); // searchParams 변경을 감지하도록 수정

  const handleLogin = () => {
    // 리다이렉트 경로가 있으면 로그인 후 해당 페이지로 이동
    const callbackUrl = redirectPath ? `/${redirectPath}` : "/";
    signIn("kakao", { callbackUrl });
  };

  const handleExplore = () => {
    router.push("/onboarding");
  };

  const tmp = () => {
    console.log("랜딩페이지 무너 클릭");
  };

  // 로딩 중이거나 인증된 사용자는 로딩 페이지 표시
  if (isLoading || isAuthenticated) {
    return (
      /* 커스텀 로딩 페이지 추가 */
      // <LoadingPage
      //   message={isLoading ? "로그인 확인 중입니다..." : "페이지로 이동 중입니다..."}
      //   error={null}
      // />
      <div>{isLoading ? "로딩중..." : "페이지로 이동 중..."}</div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#fff5f9] to-[#fdfbfb] px-6">
      {/* 중앙 로고 + 문구 */}
      <div className="mt-55 flex flex-col items-center justify-center gap-4">
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

      {/* 하단 버튼 */}
      <div className="mb-15 flex w-full max-w-xs flex-col gap-3">
        {!session && (
          <Button
            onClick={handleLogin}
            className="h-12 rounded-lg bg-[#FEE500] text-gray-800 shadow-md">
            카카오로 시작하기
          </Button>
        )}
        <button
          onClick={handleExplore}
          className="cursor-pointer text-sm text-gray-700">
          {">"} 로그인 없이 둘러보기
        </button>
      </div>
    </div>
  );
}
