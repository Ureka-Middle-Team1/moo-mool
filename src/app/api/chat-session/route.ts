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

    console.log("plan_id: ", planId);

    // 1. 채팅 세션 생성
    const created = await prisma.chatSession.create({
      data: {
        user_id: userId,
        messages: JSON.stringify(messages),
        summary, // 자동 생성된 summary 사용
        plan_id: planId,
      },
    });

    // 2. 유저의 추천 요금제 DB에 업데이트 (planId가 존재할 때만)
    if (planId) {
      await prisma.user.update({
        where: { id: userId },
        data: { recommended_plan: planId },
      });
    }

    return NextResponse.json(created);
  } catch (err) {
    console.error("[CHAT_SESSION_POST_ERROR]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
