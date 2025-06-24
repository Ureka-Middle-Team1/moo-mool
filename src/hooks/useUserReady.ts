import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

export function useUserReady(userId: string) {
  const { data: userInfo, isLoading: loadingInfo } = useGetUserInfo(userId);
  const { data: profile, isLoading: loadingProfile } =
    useGetUserCharacterProfile(userId);

  const isReady = !loadingInfo && !loadingProfile && userInfo && profile;
  return { isReady, userInfo, profile };
}
