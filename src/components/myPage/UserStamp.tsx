"use client";

import Image from "next/image";

type Props = {
  invitedCount: number;
};

const TOTAL_STAMPS = 10;

export default function UserStamp({ invitedCount }: Props) {
  const stamps = Array.from({ length: TOTAL_STAMPS }, (_, i) => {
    const isStamped = invitedCount >= i + 1;

    const src = isStamped
      ? "/assets/stamps/stamp_red.svg"
      : "/assets/stamps/stamp_gray.svg";

    return (
      <div
        key={i}
        className="relative flex h-[50px] w-[50px] items-center justify-center">
        <Image
          alt="스탬프 이미지"
          src={src}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  });

  return (
    <div className="mb-5 grid w-full grid-cols-5 gap-x-2 gap-y-6 px-2">
      {stamps}
    </div>
  );
}
