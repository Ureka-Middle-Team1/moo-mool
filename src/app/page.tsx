"use client";

import CharacterModel from "@/components/chat/CharacterModel";
import TopGradient from "@/components/planDetail/TopGradient";
import { Button } from "@/components/ui/button";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
// import LoadingPage from "@/components/common/LoadingPage";
// import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, isRedirecting, error } = useAuthRedirect();
  const [redirectPath, setRedirectPath] = useState("");
  const hasShownToast = useRef(false);

  // URL 파라미터에서 메시지 확인
  useEffect(() => {
    const redirect = searchParams.get("redirect");

    if (redirect && !hasShownToast.current) {
      hasShownToast.current = true;
      setRedirectPath(redirect);

      /* sonner 겹침 방지 위해 임시 주석처리
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

  // 로딩 중이거나 리다이렉트 중일 때 로딩 페이지 표시
  if (isLoading || isRedirecting) {
    return (
      /* 커스텀 로딩 페이지 추가 */
      // <LoadingPage
      //   message={
      //     isLoading ? "로그인 확인 중입니다..." : "페이지로 이동 중입니다..."
      //   }
      //   error={error}
      // />
      <div>로딩중...</div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-gradient-to-b from-[#fff1e5] to-[#ffe5f1] px-4">
      <TopGradient />
      {/* 무물 로고 영역 */}
      <div className="z-20 mt-20 flex w-full justify-center">
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={120}
          height={120}
        />
      </div>
      {/* 캐릭터 영역 */}
      <Canvas
        style={{ width: "60%", height: "45%" }}
        camera={{ position: [0, 2, 4], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <CharacterModel onClick={tmp} isSpeaking={false} isThinking={false} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
      {/* 버튼 영역 */}
      <div className="z-10 mt-auto mb-10 flex w-full max-w-xs flex-col gap-4 font-semibold">
        <Button
          onClick={handleLogin}
          variant="pink"
          className="flex items-center justify-center gap-2 py-6 text-lg font-semibold text-white">
          <Image
            src={"/assets/icons/message-circle.png"}
            alt="메세지"
            width={15}
            height={15}
          />
          카카오로 시작하기
          {/* {redirectPath ? "로그인하고 계속하기" : "카카오로 시작하기"} */}
        </Button>

        <Button
          onClick={handleExplore}
          variant="pink"
          className="flex items-center justify-center py-6 text-lg font-semibold text-white">
          둘러보기
        </Button>
      </div>
    </div>
  );
}
