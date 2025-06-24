"use client";

import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { maskName } from "./maskName";

type Props = {
  userId: string;
  angle?: number;
  distance?: number;
  isMe: boolean;
  onClick?: (type?: string) => void;
  isEmptyStamp?: boolean;
  showHeart?: boolean;
};

export default function NearbyUserAvatar({
  userId,
  angle,
  distance,
  isMe,
  onClick,
  isEmptyStamp = false,
  showHeart = false,
}: Props) {
  // ✅ 훅은 항상 호출
  const { data: profile, isLoading: isProfileLoading } =
    useGetUserCharacterProfile(userId);
  const { data: userInfo, isLoading: isUserInfoLoading } =
    useGetUserInfo(userId);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const loading = isProfileLoading || isUserInfoLoading;

  const characterType = profile?.type?.toLowerCase();
  const invitedCount = userInfo?.invited_count ?? 0;
  const level = invitedCount >= 10 ? 3 : invitedCount >= 5 ? 2 : 1;

  const imageSrc = characterType
    ? `/assets/moono/${level === 1 ? "" : `lv${level}/`}${characterType}-moono.png`
    : "/assets/moono/default-moono.png";

  // ✅ useMemo는 항상 같은 위치에서 호출되도록 보장
  const { angleDeg, distancePx } = useMemo(() => {
    const angleDeg = angle ?? Math.random() * 360;
    const rawDistance = distance ?? Math.random() * 30 + 40;
    const maxSafeDistance =
      Math.min(window.innerWidth, window.innerHeight) / 2 - 60;
    const distancePx = Math.min(rawDistance * 1.5, maxSafeDistance);
    return { angleDeg, distancePx };
  }, [userId, angle, distance]);

  const rad = (angleDeg * Math.PI) / 180;
  const x = Math.cos(rad) * distancePx;
  const y = Math.sin(rad) * distancePx;

  const offsetY = isMe ? -3.2 : 0;
  const offsetX = isMe ? -2.2 : 0;
  const width = isMe ? 75 : 50;
  const height = isMe ? 75 : 50;

  const handleClickAvatar = () => {
    if (!isMe && profile?.type && onClick) {
      console.log("✅ 아바타 클릭됨 → 타입 전달:", profile.type);
      onClick(profile.type);
    }
  };

  // ✅ 로딩 중이면 렌더링 생략하되, 훅은 항상 호출된 상태
  if (loading) return null;

  return (
    <div
      ref={wrapperRef}
      onClick={handleClickAvatar}
      className="absolute flex flex-col items-center text-center"
      style={{
        transform: `translate(calc(-50% + ${x + offsetX}px), calc(-50% + ${y + offsetY}px))`,
        left: "50%",
        top: "50%",
        cursor: isMe ? "default" : "pointer",
        zIndex: 10,
        touchAction: "manipulation",
      }}>
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -30 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="absolute -top-6 text-2xl">
            💛
          </motion.div>
        )}
      </AnimatePresence>

      {isEmptyStamp ? (
        <div className="relative" style={{ width, height }}>
          <motion.img
            initial={{ scale: 1.6, y: -40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src="/assets/icons/empty_stamp.png"
            alt="empty-stamp"
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="relative" style={{ width, height }}>
          <Image
            onClick={handleClickAvatar}
            src={imageSrc}
            alt="user-avatar"
            width={width}
            height={height}
            className="object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/moono/default-moono.png";
            }}
          />
        </div>
      )}

      <span className="mt-1 max-w-[5rem] text-xs break-all text-gray-600">
        {isMe ? "나" : userInfo?.name ? maskName(userInfo.name) : ""}
      </span>
    </div>
  );
}
