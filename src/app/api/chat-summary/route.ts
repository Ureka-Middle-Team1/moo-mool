import { NextResponse } from "next/server";
import { client } from "@/lib/axiosInstance";
import { getPrompt } from "@/lib/chat/getPrompt";
import fs from "fs/promises";
import path from "path";

// 사용자가 챗봇을 종료할 경우, 지금까지의 챗봇 대화 내역을 요약하기 위해 GPT 모델에 요청을 보내는 함수
export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages || typeof messages !== "string") {
    return NextResponse.json(
      { error: "messages 누락 또는 형식 오류" },
      { status: 400 }
    );
  }

  // 대화 내역에 대해서 공백 포함 11줄짜리 요약을 수행하는 프롬프트 호출
  const basePath = path.resolve(process.cwd(), "src/lib/chat/prompts");
  const systemPrompt = await fs.readFile(
    path.join(basePath, "chatbot_result_summary.txt"),
    "utf-8"
  );

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API 키 누락" }, { status: 500 });
  }

  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await client.post(
      url,
      {
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: messages },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const normalizedValue =
      response.data?.choices?.[0]?.message?.content?.trim() ?? "INVALID";

    console.log("요약 결과: ", normalizedValue);

    return NextResponse.json({ normalizedValue });
  } catch (error) {
    console.error("❌ normalizeUserPrompt 처리 중 오류:", error);
    return NextResponse.json({ error: "GPT 호출 실패" }, { status: 500 });
  }
}
