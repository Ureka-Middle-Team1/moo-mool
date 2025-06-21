import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ 근거리 통신에서 stamp를 찍은 count만큼 invited_count를 증가시키는 API
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const userId = session.user.id;

  try {
    const { count } = await req.json();

    if (!userId || typeof count !== "number") {
      return NextResponse.json(
        { error: "userId 또는 count 값이 잘못되었습니다." },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        invited_count: {
          increment: count,
        },
      },
    });

    return NextResponse.json({
      success: true,
      invited_count: updated.invited_count,
    });
  } catch (err) {
    console.error("🔴 초대 수 증가 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
