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
  isEmptyStamp?: boolean; // ✅ 클릭된 사용자일 경우 empty_stamp로 표시
};

export default function NearbyUserAvatar({
  userId,
  angle,
  distance,
  isMe,
  onClick,
  isEmptyStamp = false,
}: Props) {
  const { data: profile } = useGetUserCharacterProfile(userId);
  const { data: userInfo } = useGetUserInfo(userId ?? "");

  const imageSrc = profile?.type
    ? `/assets/moono/${profile.type.toLowerCase()}-moono.png`
    : "/assets/moono/default-moono.png";

  // ✅ 위치 고정
  const { angleDeg, distancePx } = useMemo(() => {
    const angleDeg = angle ?? Math.random() * 360;
    const rawDistance = distance ?? Math.random() * 30 + 40;
    const distancePx = Math.min(rawDistance * 1.5, 180);
    return { angleDeg, distancePx };
  }, [userId, angle, distance]);

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
      {/* ✅ 이미지 표시 */}
      {isEmptyStamp ? (
        <img
          src="/assets/icons/empty_stamp.png"
          alt="empty-stamp"
          width={48}
          height={48}
          style={{ opacity: 0.9 }}
        />
      ) : (
        <div
          className={`relative rounded-full bg-white ${isMe ? "shadow-2xl" : "shadow-xl"}`}
          style={{ width: size, height: size }}>
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
      )}

      {/* ✅ 이름은 항상 표시 */}
      <span className="mt-1 max-w-[5rem] text-xs break-all text-gray-600">
        {userInfo?.name}
      </span>
    </div>
  );
}
