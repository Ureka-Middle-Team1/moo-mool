"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import HeadLogo from "../common/headlogo";

type Props = {
  onAvatarClick: () => void;
};

export default function HomeHeader({ onAvatarClick }: Props) {
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

        {/* 우측: 로그인 상태에 따라 표시, <Avatar>로 표시되면, 눌렀을 시 마이페이지 모달 토글 가능해야 함 */}
        {isLoggedIn ? (
          <Avatar
            className="h-10 w-10 cursor-pointer bg-gray-500"
            onClick={onAvatarClick}>
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
