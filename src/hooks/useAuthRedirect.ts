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
        router.replace("/home");
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
