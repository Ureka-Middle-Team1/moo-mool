"use client";

import { signIn, useSession } from "next-auth/react";
import NearbyContent from "./NearbyContent";

export default function NearbyPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>로딩 중...</div>;
  if (status === "unauthenticated") {
    signIn("kakao", { callbackUrl: "/nearby" });
    return null;
  }
  return <NearbyContent session={session} />;
}
