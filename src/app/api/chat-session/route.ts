import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: 최근 채팅 세션 5개
export async function POST(req: NextRequest) {
  try {
    const { userId, messages, summary } = await req.json();

    if (!userId || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "유효하지 않은 요청" },
        { status: 400 }
      );
    }

    const created = await prisma.chatSession.create({
      data: {
        user_id: userId,
        messages: JSON.stringify(messages),
        summary, // 자동 생성된 summary 사용
      },
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error("[CHAT_SESSION_POST_ERROR]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
