"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UseInfoPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>로딩 중...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-6">
      <h1>로그인 성공 🎉</h1>
      <p>이름: {session.user?.name}</p>
      <p>이메일: {session.user?.email}</p>
      <img
        src={session.user?.image ?? ""}
        alt="프로필 이미지"
        className="w-20 h-20 rounded-full"
      />
    </div>
  );
}
