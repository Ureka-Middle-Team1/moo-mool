"use client";

import { signIn, useSession } from "next-auth/react";
import NearbyContent from "./NearbyContent";
import GlobalLoading from "../loading";

export default function NearbyPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <GlobalLoading />;
  if (status === "unauthenticated") {
    signIn("kakao", { callbackUrl: "/nearby" });
    return null;
  }
  return <NearbyContent session={session} />;
}
