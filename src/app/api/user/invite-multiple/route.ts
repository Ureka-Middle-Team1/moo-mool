import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ 근거리 통신에서 stamp를 찍은 count만큼 invited_count를 증가시키는 API
export async function POST(req: NextRequest) {
  try {
    const { inviterId, count } = await req.json();

    if (!inviterId || typeof count !== "number") {
      return NextResponse.json(
        { error: "inviterId 또는 count 값이 잘못되었습니다." },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: inviterId },
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
