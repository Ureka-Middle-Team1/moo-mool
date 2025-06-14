"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = () => {
    const currentUrl = window.location.search.includes("callbackUrl=")
      ? decodeURIComponent(
          new URLSearchParams(window.location.search).get("callbackUrl")!
        )
      : "/";
    signIn("kakao", { callbackUrl: currentUrl });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button
        onClick={handleLogin}
        className="rounded bg-yellow-400 px-4 py-2 text-black">
        카카오로 로그인
      </button>
    </div>
  );
}
