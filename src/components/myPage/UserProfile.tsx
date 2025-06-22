import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

interface UserProfileProps {
  invitedCount: number;
}

export default function UserProfile({ invitedCount }: UserProfileProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;

  const { data: userCharacterProfile } = useGetUserCharacterProfile(
    userId ? userId : undefined
  );

  const level = invitedCount >= 10 ? 3 : invitedCount >= 5 ? 2 : 1;

  const characterType = userCharacterProfile?.type?.toLowerCase();

  const imagePath = characterType
    ? level === 1
      ? `/assets/moono/${characterType}-moono.png`
      : `/assets/moono/lv${level}/${characterType}-moono.png`
    : session?.user?.image;

  return (
    <>
      {isLoggedIn ? (
        <div className="flex w-full flex-row items-center gap-7 px-4 py-2">
          <Avatar className="relative h-[6rem] w-[6rem] overflow-hidden rounded-full bg-gray-500 shadow-md">
            <AvatarImage
              src={imagePath}
              alt="user-avatar"
              className="h-full w-full rounded-full object-cover"
            />
            <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full">
              🐤
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-gray-900">
              {session.user.name}님
            </p>
            <p className="text-sm text-gray-700 underline">
              {session.user.email}
            </p>
          </div>
        </div>
      ) : (
        <div>로딩한 것이 없습니다.</div>
      )}
    </>
  );
}
