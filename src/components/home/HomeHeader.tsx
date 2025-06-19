"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { signIn, useSession } from "next-auth/react";
import HeadLogo from "../common/headlogo";
import HamburgerMenu from "../common/HamburgerMenu";

type Props = {
  onAvatarClick: () => void;
};

export default function HomeHeader({ onAvatarClick }: Props) {
  return (
    <div className="w-full pt-2">
      <div className="flex items-center justify-between">
        {/* 좌측 로고 */}
        <HeadLogo />
        <HamburgerMenu onAvatarClick={onAvatarClick} />
      </div>
    </div>
  );
}
