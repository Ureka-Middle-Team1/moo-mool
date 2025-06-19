import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: 최근 채팅 세션 5개
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const sessions = await prisma.chatSession.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        summary: true,
        created_at: true,
        plan: {
          // Plan 테이블을 prisma 객체에서 ChatSession 테이블과 관계 지어놓은 필드
          select: {
            name: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
      take: 5,
    });

    const response = sessions.map((session) => ({
      id: session.id,
      summary: session.summary,
      created_at: session.created_at,
      name: session.plan?.name ?? null,
    }));

    // return
    return NextResponse.json(response);
  } catch (err) {
    console.error("[CHAT_SESSION_LIST_ERROR]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

// 채팅 내역을 DB에 저장하는 POST API
export async function POST(req: NextRequest) {
  try {
    const { userId, messages, summary, planId } = await req.json();

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
        plan_id: planId,
      },
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error("[CHAT_SESSION_POST_ERROR]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
