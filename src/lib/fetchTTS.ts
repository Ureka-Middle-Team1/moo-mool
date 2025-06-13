import { client } from "@/lib/axiosInstance";

export async function fetchTTSFromServer(text: string): Promise<string> {
  const res = await client.post("/tts", { text });
  return res.data.audioContent;
}
