// 밈테스트 진행 시 tested_count + 1 API
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId가 없습니다. " },
        { status: 400 }
      );
    }

    //UserCharacterProfile이 있는지 확인
    const profile = await prisma?.userCharacterProfile.findUnique({
      where: { user_id: userId },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        tested_count: profile ? { increment: 1 } : 1,
      },
    });

    return NextResponse.json({
      success: true,
      tested_count: updatedUser?.tested_count,
    });
  } catch (error) {
    console.error("테스트 수 업데이트 오류", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
