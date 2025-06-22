"use client";

import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  userId: string;
  angle?: number;
  distance?: number;
  isMe?: boolean;
  onClick?: (type?: string) => void;
  isEmptyStamp?: boolean; // 클릭된 사용자일 경우 empty_stamp로 표시
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

  // 공통 동작 처리 함수
  const triggerClick = () => {
    if (!isMe && profile?.type && onClick) {
      onClick(profile.type);
      console.log("✅ 사용자 선택됨 (공통 로직):", profile.type);
    }
  };

  // 모바일 터치 이벤트 (같은 타입일 때만)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || isMe || !profile?.type) return;

    const handleTouch = () => {
      const myType = localStorage.getItem("myType"); //  내 타입 비교용 (임시 저장)
      console.log("myType", myType);
      console.log("profile.type, ", profile.type);

      if (myType && profile.type === myType) {
        triggerClick();
      } else {
        console.log("❌ 타입 다름으로 터치 무시됨");
      }
    };

    el.addEventListener("touchstart", handleTouch);
    return () => {
      el.removeEventListener("touchstart", handleTouch);
    };
  }, [profile?.type, isMe, onClick]);

  // 클릭 (PC 또는 모바일 공통)
  const handleClickAvatar = () => {
    const myType = localStorage.getItem("myType");
    console.log("isMe : ", isMe);
    console.log("profile.type : ", profile?.type);

    if (!isMe && profile?.type && profile.type === myType) {
      triggerClick();
    } else {
      console.log("❌ 클릭 무시됨 - 조건 불충분");
    }
  };

  const imageSrc = profile?.type
    ? `/assets/moono/${profile.type.toLowerCase()}-moono.png`
    : "/assets/moono/default-moono.png";

  // 위치 고정
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

  return (
    <div
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
      {/*  하트 애니메이션 */}
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
      {/* 이미지 표시 */}
      {isEmptyStamp ? (
        <div
          className={`relative rounded-full bg-white ${isMe ? "shadow-2xl" : "shadow-xl"}`}
          style={{ width: size, height: size }}>
          <Image
            src="/assets/icons/empty_stamp.png"
            alt="empty-stamp"
            width={isMe ? 80 : 48}
            height={isMe ? 80 : 48}
            className="scale-90 object-contain"
          />
        </div>
      ) : (
        <div
          className={`relative rounded-full bg-white ${isMe ? "shadow-2xl" : "shadow-xl"}`}
          style={{ width: size, height: size }}>
          <Image
            onClick={handleClickAvatar}
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

      {/* 이름은 항상 표시 */}
      <span className="mt-1 max-w-[5rem] text-xs break-all text-gray-600">
        {userInfo?.name}
      </span>
    </div>
  );
}
