"use client";

import { useRouter } from "next/navigation";

export default function HeadLogo() {
  const router = useRouter();
  const handleToHome = () => {
    router.push("/home");
  };

  return (
    <div className="cursor-pointer">
      {/* 좌측 로고 */}
      <img
        src="/assets/icons/logo.png"
        alt="logo"
        className="h-auto w-18"
        onClick={handleToHome}
      />
    </div>
  );
}
