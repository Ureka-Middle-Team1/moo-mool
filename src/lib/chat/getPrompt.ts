// src/lib/getPrompt.ts
import { readFile } from "fs/promises";
import path from "path";

// 다양한 질문에 대해서 응답 normalize를 위해 해당하는 systemPrompt를 불러오는 getPrompt()
export async function getPrompt(questionId: number): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "chat",
    "prompts",
    `question_${questionId}.txt`
  );
  try {
    const content = await readFile(filePath, "utf8");
    return content;
  } catch (error) {
    console.error(`❌ 프롬프트 로딩 실패 (questionId=${questionId})`, error);
    throw new Error("Prompt 파일을 불러올 수 없습니다.");
  }
}
