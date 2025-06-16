// app/api/chat-freetalk/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import axios from "axios";

export async function POST(req: Request) {
  const { message, lastSummary } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "message 누락 또는 형식 오류" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY; // openAI의 API 키 가져오기
  if (!apiKey) {
    return NextResponse.json({ error: "API 키 누락" }, { status: 500 });
  }

  const url = "https://api.openai.com/v1/chat/completions";

  // 텍스트 파일에서 관련 prompt를 읽어온다
  const filePath = path.join(
    process.cwd(),
    "src/lib/chat/prompts/free_talk.txt"
  );

  // 파일 읽기는 반드시 비동기 처리(fs/promises) 권장하므로, 아래와 같은 형태를 띄어야 함
  let systemPrompt: string;
  try {
    systemPrompt = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    console.error("❌ system prompt 파일 읽기 실패:", err);
    return NextResponse.json(
      { error: "system prompt 로딩 실패" },
      { status: 500 }
    );
  }

  // 읽어온 프롬프트를 바탕으로 GPT API 요청 처리
  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-4.1-nano",
        messages: [
          // 요약된 대화를 system 메시지로 포함해야 GPT가 "기억"하게 됨
          {
            role: "system",
            content: lastSummary ? `[요약]\n${lastSummary}` : "",
          },
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.8,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // GPT API로부터 받은 응답
    const reply = response.data?.choices?.[0]?.message?.content?.trim();

    // 응답이 비어 있다면
    if (!reply) {
      return NextResponse.json(
        { error: "GPT 응답이 비어 있습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: reply });
  } catch (error) {
    console.error("❌ FREETALK GPT 처리 중 오류:", error);
    return NextResponse.json({ error: "GPT 호출 실패" }, { status: 500 });
  }
}
