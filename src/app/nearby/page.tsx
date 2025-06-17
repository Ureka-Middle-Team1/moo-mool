"use client";

import NearbyHeader from "@/components/nearby/NearbyHeader";
import { useNearbySocket } from "@/hooks/useNearbySocket";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

type NearbyUser = {
  userId: string;
  distance: number;
  angle?: number;
  emoji?: string;
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
    // 유효한 사용자만 반영
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
        {[30, 50, 70, 90, 110, 130].map((r, idx) => (
          <div
            key={`circle-${r}`}
            className="absolute animate-ping rounded-full border border-yellow-300"
            style={{
              width: `${r}vw`,
              height: `${r}vw`,
              left: `calc(50% - ${r / 2}vw)`,
              top: `calc(50% - ${r / 2}vw)`,
              animationDelay: `${idx * 0.4}s`,
              opacity: 0.3,
            }}
          />
        ))}

        <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 font-bold text-white shadow-md">
          나
        </div>

        {users.map((user) => {
          const angle = user.angle ?? Math.random() * 360;
          const distance = Math.min(user.distance * 80, 180);
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;

          return (
            <div
              key={`nearby-${user.userId}`}
              className="absolute flex flex-col items-center text-center"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                left: "50%",
                top: "50%",
              }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-xl shadow">
                👤
              </div>
              <span className="mt-1 max-w-[80px] text-xs break-all text-gray-400">
                {user.userId}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
