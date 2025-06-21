"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";

type Props = {
  onAvatarClick: () => void;
};

export default function HamburgerMenu({ onAvatarClick }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;
  const { data: userCharacterProfile } = useGetUserCharacterProfile(
    userId ?? ""
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
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
        className="h-screen w-[60%] max-w-xs px-6 py-4">
        {/* ✅ 프로필 영역 */}
        {isLoggedIn && (
          <div
            className="mt-4 mb-6 flex cursor-pointer items-center gap-3"
            onClick={() => {
              onAvatarClick(); // 모달 열기
              setOpen(false); // 사이드바 닫기
            }}>
            <img
              src={
                userCharacterProfile?.type
                  ? `/assets/moono/${userCharacterProfile.type.toLowerCase()}-moono.png`
                  : session.user.image
              }
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
  );
}
