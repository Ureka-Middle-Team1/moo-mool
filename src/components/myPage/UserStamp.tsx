"use client";

import { useEffect, useState, useRef } from "react";
import { useUserStore } from "@/store/userStore";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useSession } from "next-auth/react";
import { gsap } from "gsap";

const STAMP_TOTAL = 5;
const MAX_STAMP = 10;

export default function UserStamp() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data } = useGetUserCharacterProfile(userId ?? "");

  // data가 없으면 잠금(블러+자물쇠) 처리
  if (!data) {
    return (
      <div className="relative mx-auto grid w-fit grid-cols-5 gap-3">
        {Array.from({ length: STAMP_TOTAL }).map((_, idx) => (
          <div
            key={idx}
            className="relative flex h-13 w-13 flex-col items-center justify-center">
            <img
              src="/assets/stamps/stamp_gray.svg"
              alt="gray-stamp"
              className="object-unset h-10 w-10"
            />
          </div>
        ))}
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <img
            src="/assets/stamps/locked.svg"
            alt="lock"
            className="h-8 w-8 opacity-80"
          />
          <span className="mt-2 text-xs text-gray-800">
            테스트하고 당신의 무너를 확인해보세요!
          </span>
        </div>
      </div>
    );
  }

  const invitedCountRaw = useUserStore((state) => state.invitedCount);
  const invitedCount = Math.min(invitedCountRaw, MAX_STAMP);

  const prevCountRef = useRef<number>(invitedCount);
  const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
  const stampRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (invitedCount > prevCountRef.current) {
      const newAnimated = Array.from(
        { length: invitedCount - prevCountRef.current },
        (_, i) => i + prevCountRef.current
      );
      setAnimatedIndexes(newAnimated);

      newAnimated.forEach((index) => {
        const target = stampRefs.current[index % STAMP_TOTAL];
        if (target) {
          gsap.fromTo(
            target,
            { scale: 2, opacity: "50% 50%" },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
          );
        }
      });

      setTimeout(() => setAnimatedIndexes([]), 1000);
    }

    prevCountRef.current = invitedCount;
  }, [invitedCount]);

  // 현재 판에서 몇 개 찍혔는지 계산 (최대 5)
  const currentRoundCount =
    invitedCount % STAMP_TOTAL === 0 && invitedCount !== 0
      ? STAMP_TOTAL
      : invitedCount % STAMP_TOTAL;

  // 10개 이상이면 5개 모두 빨간색, 마지막도 빨간색
  const isMax = invitedCountRaw >= MAX_STAMP;

  return (
    <div className="mx-auto grid w-fit grid-cols-5 gap-3">
      {Array.from({ length: STAMP_TOTAL }).map((_, index) => {
        // 1~4번째 도장
        if (index < STAMP_TOTAL - 1) {
          return (
            <div
              key={index}
              ref={(el) => {
                stampRefs.current[index] = el;
              }}
              className="relative flex h-13 w-13 flex-col items-center justify-center">
              <img
                style={{ backfaceVisibility: "hidden" }}
                src={
                  isMax
                    ? "/assets/stamps/stamp_red.svg"
                    : currentRoundCount > index
                      ? "/assets/stamps/stamp_red.svg"
                      : "/assets/stamps/stamp_gray.svg"
                }
                alt="stamp"
                className="object-unset h-12 w-12"
              />
            </div>
          );
        }
        // 5번째(마지막) 도장
        return (
          <div
            key={index}
            ref={(el) => {
              stampRefs.current[index] = el;
            }}
            className="relative flex h-13 w-13 flex-col items-center justify-center">
            <img
              style={{ backfaceVisibility: "hidden" }}
              src={
                isMax
                  ? "/assets/stamps/levelup_stamp_red.svg"
                  : currentRoundCount === STAMP_TOTAL
                    ? "/assets/stamps/levelup_stamp_red.svg"
                    : "/assets/stamps/levelup_stamp_gray.svg"
              }
              alt="level up"
              className="object-unset h-12 w-12"
            />
            {/* 하단에 levelup 스탬프 추가 */}
            <img
              src={
                isMax
                  ? "/assets/stamps/levelup_red.svg"
                  : currentRoundCount === STAMP_TOTAL
                    ? "/assets/stamps/levelup_red.svg"
                    : "/assets/stamps/levelup_gray.svg"
              }
              alt="level up bottom"
              className="absolute -bottom-4 left-1/2 w-15 -translate-x-1/2"
            />
          </div>
        );
      })}
    </div>
  );
}
