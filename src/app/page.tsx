"use client";

import CharacterModel from "@/components/chat/CharacterModel";
import TopGradient from "@/components/planDetail/TopGradient";
import { Button } from "@/components/ui/button";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 로그인 상태면 홈으로 자동 리다이렉트
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status, router]);

  const handleLogin = () => {
    signIn("kakao", { callbackUrl: "/check-user-type" });
  };

  const handleExplore = () => {
    router.push("/onboarding");
  };

  const tmp = () => {
    console.log("랜딩페이지 무너 클릭");
  };

  return (
    <div className="relative flex h-screen flex-col items-center bg-gradient-to-b from-[#fff1e5] to-[#ffe5f1] px-4">
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
      <div className="z-10 mt-auto mb-4 flex w-full max-w-xs flex-col gap-4 font-semibold">
        {!session && (
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
          </Button>
        )}

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
