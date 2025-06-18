"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckUserTypePage() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await fetch("/api/auth/is-new-user");
      const data = await res.json();
      if (data.isNew) {
        router.replace("/onboarding");
      } else {
        router.replace("/home");
      }
    };

    check();
  }, [router]);

  return <p className="mt-20 text-center">로그인 확인 중입니다...</p>;
}
