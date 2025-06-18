import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const sessionId = parseInt(context.params.id, 10);

  if (isNaN(sessionId)) {
    return NextResponse.json(
      { error: `잘못된 session ID:${sessionId}` },
      { status: 400 }
    );
  }

  try {
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: "세션을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (err) {
    console.error("[CHAT_SESSION_GET_ERROR]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
