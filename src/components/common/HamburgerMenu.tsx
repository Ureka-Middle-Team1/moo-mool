"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import MyPageModal from "@/components/myPage/MyPageModal";
import { useMyPageModalStore } from "@/store/useMyPageModalStore";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

export default function HamburgerMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { open: isMyPageOpen, setOpen: setIsMyPageOpen } =
    useMyPageModalStore();

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;
  const { data: userCharacterProfile } = useGetUserCharacterProfile(
    userId ?? ""
  );
  const { data: userInfo } = useGetUserInfo(userId);
  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogin = () => {
    signIn("kakao", { callbackUrl: window.location.pathname });
  };

  // 초대한 친구 수에 따라 레벨 결정 (props로 받은 invitedCount 사용)
  const invitedCount = userInfo?.invited_count ?? 0;
  const level = invitedCount >= 10 ? 3 : invitedCount >= 5 ? 2 : 1;
  const characterType = userCharacterProfile?.type?.toLowerCase();
  const imagePath = characterType
    ? level === 1
      ? `/assets/moono/${characterType}-moono.png`
      : `/assets/moono/lv${level}/${characterType}-moono.png`
    : session?.user?.image;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            onClick={() => {}}
            className="flex h-10 w-10 items-center justify-center rounded-full p-0 transition hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="h-screen w-[80vw] max-w-xs px-6 py-4 sm:w-[60vw]">
          <VisuallyHidden>
            <DialogTitle>사이드 메뉴</DialogTitle>
          </VisuallyHidden>
          {/* ✅ 프로필 영역 */}
          {isLoggedIn ? (
            <div
              className="mt-4 mb-6 flex cursor-pointer items-center gap-3"
              onClick={() => {
                setIsMyPageOpen(true);
                setOpen(false);
              }}>
              <img
                src={imagePath}
                alt="user-avatar"
                className="h-10 w-10 rounded-full border border-gray-300 object-contain"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="mt-4 mb-4 flex h-10 w-24 items-center justify-center rounded-md bg-yellow-300 px-4 py-1 text-sm font-semibold shadow-sm transition hover:bg-yellow-400">
              로그인
            </button>
          )}
          {/* ✅ 메뉴 네비게이션 */}
          <nav className="space-y-4">
            <button
              onClick={() => handleNavigate("/home")}
              className="text-md hover:text-primary block font-semibold">
              홈
            </button>
            <button
              onClick={() => handleNavigate("/chat")}
              className="text-md hover:text-primary block font-semibold">
              챗봇
            </button>
            <button
              onClick={() => handleNavigate("/planlist")}
              className="text-md hover:text-primary block font-semibold">
              요금제 리스트
            </button>
            <button
              onClick={() => handleNavigate("/meme-test")}
              className="text-md hover:text-primary block font-semibold">
              밈 테스트
            </button>
            <button
              onClick={() => handleNavigate("/nearby")}
              className="text-md hover:text-primary block font-semibold">
              주변 친구 찾기
            </button>
          </nav>
        </SheetContent>
      </Sheet>
      <MyPageModal open={isMyPageOpen} onOpenChange={setIsMyPageOpen} />
    </>
  );
}
