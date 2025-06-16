"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn } from "next-auth/react";

export default function HomeHeader() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="w-full pt-2">
      <div className="flex items-center justify-between">
        {/* 좌측 로고 */}
        <img src="/assets/icons/logo.png" alt="logo" className="h-auto w-18" />

        {/* 우측: 로그인 상태에 따라 표시 */}
        {isLoggedIn ? (
          <Avatar className="h-10 w-10 bg-gray-500">
            <AvatarImage
              src={session.user.image ?? "/assets/moono/books-moono.png"}
              alt="user-avatar"
              className="scale-80 object-contain"
            />
            <AvatarFallback>🐤</AvatarFallback>
          </Avatar>
        ) : (
          <button
            onClick={() => signIn()}
            className="rounded-md bg-yellow-300 px-4 py-1 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-yellow-400">
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
