import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // authOptions 경로는 실제 위치에 맞게 수정

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const sessionId = parseInt(id, 10);

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // 미들웨어에서 이미 인증된 사용자이므로 null이 아님

  if (isNaN(sessionId)) {
    return new Response(JSON.stringify({ error: "잘못된 session ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const chatSession = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!chatSession) {
      return new Response(
        JSON.stringify({ error: "세션을 찾을 수 없습니다" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 채팅방 멤버십 확인
    if (chatSession.user_id !== userId) {
      // 보안을 위해 404로 응답 (존재 여부 노출 방지)
      return new Response(
        JSON.stringify({ error: "세션을 찾을 수 없습니다" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(chatSession), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[CHAT_SESSION_GET_ERROR]", err);
    return new Response(JSON.stringify({ error: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
