"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const handleLogin = () => {
    signIn("kakao", { callbackUrl });
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
