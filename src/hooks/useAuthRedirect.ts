import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { client } from "@/lib/axiosInstance";

export const useAuthRedirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const checkUserTypeAndRedirect = async () => {
        try {
          const res = await client.get("/auth/is-new-user");
          const data = await res.data;

          if (data.isNew) {
            router.replace("/onboarding");
          } else {
            router.replace("/onboarding");
          }
        } catch (error) {
          console.error("사용자 타입 확인 실패:", error);
          // 에러 발생 시 기본적으로 홈으로 이동
          router.replace("/onboarding");
        }
      };

      checkUserTypeAndRedirect();
    }
  }, [status, router]);

  return {
    status,
    session,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  };
};
