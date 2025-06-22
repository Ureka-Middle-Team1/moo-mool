"use client";

import HeadLogo from "../common/headlogo";
import HamburgerMenu from "../common/HamburgerMenu";

export default function HomeHeader() {
  return (
    <div className="w-full pt-2">
      <div className="flex items-center justify-between">
        {/* 좌측 로고 */}
        <HeadLogo />
        <HamburgerMenu />
      </div>
    </div>
  );
}
