"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import HeadLogo from "../common/headlogo";

export default function HomeHeader() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/home";

  const { data: userCharacterProfile, isLoading } = useGetUserCharacterProfile(
    userId ?? ""
  );

  const handleLogin = () => {
    signIn("kakao", { callbackUrl });
  };

  return (
    <div className="w-full pt-2">
      <div className="flex items-center justify-between">
        {/* 좌측 로고 */}
        <HeadLogo />

        {/* 우측: 로그인 상태에 따라 표시 */}
        {isLoggedIn ? (
          <Avatar className="h-10 w-10 bg-gray-500">
            <AvatarImage
              src={
                userCharacterProfile?.type
                  ? `/assets/moono/${userCharacterProfile.type.toLowerCase()}-moono.png`
                  : session.user.image
              }
              alt="user-avatar"
              className="scale-80 object-contain"
            />
            <AvatarFallback>🐤</AvatarFallback>
          </Avatar>
        ) : (
          <button
            onClick={handleLogin}
            className="rounded-md bg-yellow-300 px-4 py-1 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-yellow-400">
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
