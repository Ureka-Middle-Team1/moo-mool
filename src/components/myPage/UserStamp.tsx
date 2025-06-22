"use client";

import { useEffect, useState, useRef } from "react";
import { useUserStore } from "@/store/userStore";
import { gsap } from "gsap";

const STAMP_TOTAL = 5;
const MAX_STAMP = 10;

export default function UserStamp() {
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
