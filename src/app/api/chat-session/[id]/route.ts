import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<Response> {
  const sessionId = parseInt(context.params.id, 10);

  if (isNaN(sessionId)) {
    return new Response(JSON.stringify({ error: "잘못된 session ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "세션을 찾을 수 없습니다" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(session), {
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
