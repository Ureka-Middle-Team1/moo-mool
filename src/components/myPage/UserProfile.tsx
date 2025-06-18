import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

// 유저 프로필
export default function UserProfile() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;

  const { data: userCharacterProfile } = useGetUserCharacterProfile(
    userId ?? ""
  );

  return (
    <>
      {isLoggedIn ? (
        <div className="flex w-full flex-row items-center gap-4 px-4 py-6">
          {/* 아바타 */}
          <Avatar className="relative h-16 w-16 rounded-full bg-gray-400">
            <AvatarImage
              src={
                userCharacterProfile?.type
                  ? `/assets/moono/${userCharacterProfile.type.toLowerCase()}-moono.png`
                  : session.user.image
              }
              alt="user-avatar"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <AvatarFallback className="flex h-full w-full items-center justify-center">
              🐤
            </AvatarFallback>
          </Avatar>

          {/* 이름, 이메일 */}
          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-900">
              {session.user.name}님
            </p>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>
      ) : (
        <div>로딩한 것이 없습니다.</div>
      )}
    </>
  );
}
