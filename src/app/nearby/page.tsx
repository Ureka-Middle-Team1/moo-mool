"use client";

import NearbyHeader from "@/components/nearby/NearbyHeader";
import { useNearbySocket } from "@/hooks/useNearbySocket";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import NearbyUserAvatar from "@/components/nearby/NearbyUserAvatar";

export type NearbyUser = {
  userId: string;
  distance: number;
  angle?: number;
};

export default function NearbyPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [users, setUsers] = useState<NearbyUser[]>([]);
  const myIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (userId) {
      myIdRef.current = userId;
    }
  }, [userId]);

  useNearbySocket((data: NearbyUser) => {
    if (
      !data.userId ||
      typeof data.userId !== "string" ||
      data.userId === myIdRef.current
    ) {
      console.warn("🔎 유효하지 않거나 본인 userId 무시:", data.userId);
      return;
    }

    console.log("📡 새 사용자 감지:", data.userId);

    setUsers((prev) => {
      const filtered = prev.filter((u) => u.userId !== data.userId);
      return [...filtered, data];
    });
  }, userId);

  if (!userId) {
    return (
      <div className="p-4 text-center text-gray-500">로그인이 필요합니다</div>
    );
  }

  return (
    <>
      <NearbyHeader />
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-white">
        {[20, 50, 70, 90, 110, 130].map((r, idx) => (
          <div
            key={`circle-${r}`}
            className="absolute animate-ping rounded-full border border-yellow-300"
            style={{
              width: `${r}vw`,
              height: `${r}vw`,
              left: `calc(50% - ${r / 2}vw)`,
              top: `calc(50% - ${r / 2}vw)`,
              animationDelay: `${idx * 0.4}s`,
              opacity: 0.8,
            }}
          />
        ))}

        <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 font-bold text-white shadow-md">
          나
        </div>

        {users.map((user) => {
          const angle = user.angle ?? Math.random() * 360;

          return (
            <NearbyUserAvatar
              key={`nearby-${user.userId}`}
              userId={user.userId}
              angle={angle}
              distance={user.distance}
            />
          );
        })}
      </div>
    </>
  );
}
