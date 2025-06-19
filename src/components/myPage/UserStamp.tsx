"use client";

import { useEffect, useState, useRef } from "react";
import { useUserStore } from "@/store/userStore";
import { gsap } from "gsap";

const STAMP_TOTAL = 10;

export default function UserStamp() {
  const invitedCount = useUserStore((state) => state.invitedCount);
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
        const target = stampRefs.current[index];
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

  return (
    <div className="mx-auto grid w-fit grid-cols-5 gap-2">
      {Array.from({ length: STAMP_TOTAL }).map((_, index) => {
        const isFilled = index < invitedCount;

        return (
          <div
            key={index}
            ref={(el) => {
              stampRefs.current[index] = el;
            }}
            className="relative flex h-13 w-13 items-center justify-center">
            <img
              style={{ backfaceVisibility: "hidden" }}
              src={
                isFilled
                  ? "/assets/stamps/stamp_red.svg"
                  : "/assets/stamps/stamp_gray.svg"
              }
              alt="stamp"
              className="object-unset h-12 w-12"
            />
          </div>
        );
      })}
    </div>
  );
}
