// app/api/chat-freetalk-summary/route.ts
import axios from "axios";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import path from "path";
import fs from "fs/promises";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { lastSummary, messages } = await req.json();

  if (!Array.isArray(messages))
    return NextResponse.json({ error: "messages missing" }, { status: 400 });

  // 1. prompt 파일 로드
  const filePath = path.join(
    process.cwd(),
    "src/lib/chat/prompts/free_talk_summary.txt"
  );

  // 2. 파일 읽기는 반드시 비동기 처리(fs/promises) 권장하므로, 아래와 같은 형태를 띄어야 함
  let systemPromptTemplate: string;
  try {
    systemPromptTemplate = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    console.error("❌ summary 프롬프트 로딩 실패:", err);
    return NextResponse.json({ error: "프롬프트 로딩 실패" }, { status: 500 });
  }

  const apiKey = process.env.OPENAI_API_KEY; // openAI의 API 키 가져오기
  if (!apiKey) {
    return NextResponse.json({ error: "API 키 누락" }, { status: 500 });
  }

  const url = "https://api.openai.com/v1/chat/completions";

  // 3. 템플릿 변수 치환
  const recentMessagesText = messages
    .map((m: any) => `${m.role}: ${m.content}`)
    .join("\n");

  const systemPrompt = systemPromptTemplate // 해당하는 내용으로 prompt 내용 교체
    .replace("{{LAST_SUMMARY}}", lastSummary || "")
    .replace("{{RECENT_MESSAGES}}", recentMessagesText);

  // 4. 읽어온 프롬프트를 바탕으로 GPT API 요청 처리
  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-4.1-nano",
        messages: [{ role: "system", content: systemPrompt }],
        temperature: 0.3,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const summary = response.data?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ summary }); // 성공적으로 요약 되면 요약본 반환
  } catch (error) {
    console.error("❌ GPT 요약 실패:", error);
    return NextResponse.json({ error: "GPT 호출 실패" }, { status: 500 });
  }
}
