"use client";

import NearbyHeader from "@/components/nearby/NearbyHeader";
import { useNearbySocket } from "@/hooks/useNearbySocket";
import { useRef, useState } from "react";

type NearbyUser = {
  userId: string;
  distance: number;
  angle?: number;
  emoji?: string;
};

export default function NearbyPage() {
  const [users, setUsers] = useState<NearbyUser[]>([]);
  const myIdRef = useRef<string>("user-" + Math.floor(Math.random() * 1000));

  useNearbySocket((data: NearbyUser) => {
    if (data.userId === myIdRef.current) return; // 자기 자신 제외

    setUsers((prev) => {
      const filtered = prev.filter((u) => u.userId !== data.userId);
      return [...filtered, data];
    });
  });

  return (
    <>
      <NearbyHeader />
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-white">
        {/* 배경 레이더 원 */}
        {[10, 50, 100, 150, 200, 250].map((r, idx) => (
          <div
            key={idx}
            className="absolute animate-ping rounded-full border border-yellow-400"
            style={{
              width: `${r}px`,
              height: `${r}px`,
              left: `calc(50% - ${r / 2}px)`,
              top: `calc(50% - ${r / 2}px)`,
              animationDelay: `${idx * 0.3}s`,
            }}
          />
        ))}

        {/* 내 아이콘 */}
        <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 font-bold text-white shadow-md">
          나
        </div>

        {/* 주변 사용자 아이콘 */}
        {users.map((user) => {
          const angle = user.angle ?? Math.random() * 360;
          const distance = Math.min(user.distance * 80, 180); // UI 최대 반지름 제한
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;

          return (
            <div
              key={user.userId}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-xl shadow"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                left: "50%",
                top: "50%",
              }}>
              {user.emoji ?? "👤"}
            </div>
          );
        })}
      </div>
    </>
  );
}
