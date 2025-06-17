"use client";

import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";

type Props = {
  userId: string;
  angle: number;
  distance: number;
};

export default function NearbyUserAvatar({ userId, angle, distance }: Props) {
  const { data: profile } = useGetUserCharacterProfile(userId);

  const boundedDistance = Math.min(distance * 80, 180);
  const x = Math.cos((angle * Math.PI) / 180) * boundedDistance;
  const y = Math.sin((angle * Math.PI) / 180) * boundedDistance;

  const characterImageSrc = profile?.type
    ? `/assets/moono/${profile.type.toLowerCase()}-moono.png`
    : "/assets/moono/default-moono.png";

  return (
    <div
      key={`nearby-${userId}`}
      className="absolute flex flex-col items-center text-center"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        left: "50%",
        top: "50%",
      }}>
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-yellow-200 text-xl shadow">
        <img
          src={characterImageSrc}
          alt="user-avatar"
          className="h-full w-full object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // 무한 루프 방지
            target.src = "/assets/moono/default-moono.png";
          }}
        />
      </div>
      <span className="mt-1 max-w-[80px] text-xs break-all text-gray-400">
        {userId}
      </span>
    </div>
  );
}
