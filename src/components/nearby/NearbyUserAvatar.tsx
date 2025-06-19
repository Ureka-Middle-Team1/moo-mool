"use client";

import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  userId: string;
  angle?: number;
  distance?: number;
  isMe?: boolean;
  onClick?: (type?: string) => void;
};

export default function NearbyUserAvatar({
  userId,
  angle,
  distance,
  isMe,
  onClick,
}: Props) {
  const { data: profile } = useGetUserCharacterProfile(userId);
  const { data: userInfo } = useGetUserInfo(userId ?? "");

  const imageSrc = profile?.type
    ? `/assets/moono/${profile.type.toLowerCase()}-moono.png`
    : "/assets/moono/default-moono.png";

  // ✅ 랜덤 위치 캐싱: 동일 userId면 angle/distance 유지
  const { angleDeg, distancePx } = useMemo(() => {
    const angleDeg = angle ?? Math.random() * 360;
    const rawDistance = distance ?? Math.random() * 30 + 40; // [40~70]
    const distancePx = Math.min(rawDistance * 1.5, 180); // px 스케일 조정
    return { angleDeg, distancePx };
  }, [userId]);

  const rad = (angleDeg * Math.PI) / 180;
  const x = Math.cos(rad) * distancePx;
  const y = Math.sin(rad) * distancePx;

  const offsetY = isMe ? -3.2 : 0;
  const offsetX = isMe ? -2.2 : 0;

  const size = isMe ? "5rem" : "3rem";

  const handleClickAvatar = () => {
    if (!isMe && profile?.type) {
      console.log("클릭한 사용자의 타입= ", profile?.type);
      onClick?.(profile?.type);
    }
  };

  return (
    <div
      onClick={handleClickAvatar}
      className="absolute flex flex-col items-center text-center"
      style={{
        transform: `translate(calc(-50% + ${x + offsetX}px), calc(-50% + ${y + offsetY}px))`,
        left: "50%",
        top: "50%",
      }}>
      <div
        className={`relative rounded-full bg-white ${
          isMe ? "shadow-2xl" : "shadow-xl"
        }`}
        style={{
          width: size,
          height: size,
        }}>
        <Image
          src={imageSrc}
          alt="user-avatar"
          width={isMe ? 80 : 48}
          height={isMe ? 80 : 48}
          className="scale-90 object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/moono/default-moono.png";
          }}
        />
      </div>
      <span className="mt-1 max-w-[5rem] text-xs break-all text-gray-600">
        {userInfo?.name}
      </span>
    </div>
  );
}
