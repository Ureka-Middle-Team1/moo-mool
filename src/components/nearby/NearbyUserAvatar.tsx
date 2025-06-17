"use client";

import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import Image from "next/image";

type Props = {
  userId: string;
  angle: number;
  distance: number;
  isMe?: boolean;
};

export default function NearbyUserAvatar({
  userId,
  angle,
  distance,
  isMe,
}: Props) {
  const { data: profile } = useGetUserCharacterProfile(userId);

  const { data: userInfo } = useGetUserInfo(userId ?? "");
  const imageSrc = profile?.type
    ? `/assets/moono/${profile.type.toLowerCase()}-moono.png`
    : "/assets/moono/default-moono.png";

  const boundedDistance = Math.min(distance * 80, 180);
  const x = Math.cos((angle * Math.PI) / 180) * boundedDistance;
  const y = Math.sin((angle * Math.PI) / 180) * boundedDistance;
  const offsetY = isMe ? -55 : 0;
  const offsetX = isMe ? -37 : 0;

  return (
    <div
      className="absolute flex flex-col items-center text-center"
      style={{
        transform: `translate(${x + offsetX}px, ${y + offsetY}px)`,
        left: "50%",
        top: "50%",
      }}>
      <div
        className={`relative overflow-hidden rounded-full shadow-md ${
          isMe ? "h-20 w-20 border-4 border-green-400" : "h-12 w-12"
        }`}>
        <Image
          src={imageSrc}
          alt="user-avatar"
          width={isMe ? 80 : 48}
          height={isMe ? 80 : 48}
          className="object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/moono/default-moono.png";
          }}
        />
      </div>
      <span className="mt-1 max-w-[80px] text-xs break-all text-gray-600">
        {userInfo?.name}
      </span>
    </div>
  );
}
