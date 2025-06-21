import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // next-auth 설정 경로 확인
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // 미들웨어에서 인증을 통과했지만, 세션 정보가 없는 경우 서버 오류로 처리
  if (!session?.user?.id) {
    console.error(
      "set-my-plan: middleware passed but session or user id is missing."
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const userId = session.user.id;
  const { planId } = await req.json();

  if (!planId) {
    return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { my_plan: planId },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error setting my plan:", error);
    return NextResponse.json(
      { error: "Failed to set my plan" },
      { status: 500 }
    );
  }
}
