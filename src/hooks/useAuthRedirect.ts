import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { client } from "@/lib/axiosInstance";

type AuthStatus = "loading" | "unauthenticated" | "checking" | "redirecting";

export const useAuthRedirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // 로딩 중
      if (status === "loading") {
        setAuthStatus("loading");
        return;
      }

      // 비로그인 상태
      if (status === "unauthenticated") {
        setAuthStatus("unauthenticated");
        return;
      }

      // 인증된 사용자 처리
      if (status === "authenticated") {
        setAuthStatus("checking");

        try {
          const res = await client.get("/auth/is-new-user");
          const data = await res.data;

          if (data.isNew) {
            router.replace("/onboarding");
          } else {
            router.replace("/home");
          }
        } catch (error) {
          console.error("사용자 타입 확인 실패:", error);
          setError("사용자 정보를 확인하는 중 오류가 발생했습니다.");

          // 에러 발생 시 기본적으로 홈으로 이동
          router.replace("/home");
        }
      }
    };

    handleAuthRedirect();
  }, [status, router]);

  return {
    status: authStatus,
    isLoading: authStatus === "loading" || authStatus === "checking",
    isRedirecting: authStatus === "redirecting",
    isUnauthenticated: authStatus === "unauthenticated",
    error,
    session,
  };
};
