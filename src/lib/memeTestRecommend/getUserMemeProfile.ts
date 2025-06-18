import { client } from "@/lib/axiosInstance";

// DB에서 밈테스트 결과를 가져오는 getUserMemeProfile
export async function getUserMemeProfile(userId: string) {
  const { data } = await client.get("/meme-test/userprofile", {
    params: { user_id: userId },
  });
  return data; // { call_level, sms_level, ... }
}
