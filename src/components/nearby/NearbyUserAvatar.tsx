"use client";

import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { maskName } from "./maskName";
import { useNearbyStore } from "@/hooks/useNearbyStore";

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
  const { data: profile } = useGetUserCharacterProfile(userId);
  const { data: userInfo } = useGetUserInfo(userId ?? "");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { myType } = useNearbyStore();

  // ✅ 클릭 로직
  const triggerClick = () => {
    if (!isMe && profile?.type && onClick) {
      onClick(profile.type);
      console.log("✅ 사용자 선택됨 (공통 로직):", profile.type);
    }
  };

  // ✅ 모바일 터치 이벤트
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || isMe || !profile?.type) return;

    const handleTouch = () => {
      const myType = localStorage.getItem("myType");
      if (myType && profile.type === myType) {
        triggerClick();
      }
    };

    el.addEventListener("touchstart", handleTouch);
    return () => {
      el.removeEventListener("touchstart", handleTouch);
    };
  }, [profile?.type, isMe, onClick]);

  const handleClickAvatar = () => {
    console.log("[👆 클릭 시도]", {
      isMe,
      myType,
      userId,
      profileType: profile?.type,
    });

    if (!isMe && profile?.type && profile.type === myType) {
      console.log("✅ triggerClick 실행됨");
      triggerClick();
    } else {
      console.warn("❌ 클릭 조건 불충족");
    }
  };

  // ✅ 레벨에 따라 이미지 경로 동적으로 계산
  const invitedCount = userInfo?.invited_count ?? 0;
  const level = invitedCount >= 10 ? 3 : invitedCount >= 5 ? 2 : 1;
  const characterType = profile?.type?.toLowerCase();

  const imageSrc = characterType
    ? isMe
      ? level === 1
        ? `/assets/moono/${characterType}-moono.png`
        : `/assets/moono/lv${level}/${characterType}-moono.png`
      : `/assets/moono/${characterType}-moono.png`
    : "/assets/moono/default-moono.png";

  // ✅ 위치 계산
  const { angleDeg, distancePx } = useMemo(() => {
    const angleDeg = angle ?? Math.random() * 360;
    const rawDistance = distance ?? Math.random() * 30 + 40;

    // 🧠 화면 크기 기준 거리 제한
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
      {/* ✅ 하트 애니메이션 */}
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

      {/* ✅ 이미지 표시 */}
      {isEmptyStamp ? (
        <div
          className="relative"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}>
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
        <div
          className="relative"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}>
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

      {/* ✅ 이름 마스킹 */}
      <span className="mt-1 max-w-[5rem] text-xs break-all text-gray-600">
        {isMe ? "나" : userInfo?.name ? maskName(userInfo.name) : ""}
      </span>
    </div>
  );
}
