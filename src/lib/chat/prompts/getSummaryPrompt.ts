import fs from "fs/promises";
import path from "path";

// 서버 시작 시 최초 1회만 파일을 읽고 이후에는 캐시 사용
let cachedPrompt: string | null = null;

export async function getSummaryPrompt(): Promise<string> {
  if (cachedPrompt) return cachedPrompt;

  const filePath = path.resolve(
    process.cwd(),
    "src/lib/chat/prompts/chatbot_result_summary.txt"
  );
  cachedPrompt = await fs.readFile(filePath, "utf-8");

  return cachedPrompt;
}
