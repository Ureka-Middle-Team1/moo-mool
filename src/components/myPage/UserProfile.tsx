import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

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
        <div className="flex w-full flex-row px-4 py-8">
          <Avatar className="h-24 w-24 overflow-hidden rounded-full bg-gray-500">
            <AvatarImage
              src={
                userCharacterProfile?.type
                  ? `/assets/moono/${userCharacterProfile.type.toLowerCase()}-moono.png`
                  : session.user.image
              }
              alt="user-avatar"
              className="h-full w-full object-cover"
            />
            <AvatarFallback>🐤</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div>로딩한 것이 없습니다.</div>
      )}
    </>
  );
}
