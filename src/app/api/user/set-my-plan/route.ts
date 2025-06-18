import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // next-auth 설정 경로 확인
import { prisma } from "@/lib/prisma";
import { use } from "react";

export async function POST(req: NextRequest) {
  try {
    // 세션 가져오기
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await req.json();
    if (!planId || typeof planId !== "number") {
      return NextResponse.json({ error: "Invalid planId" }, { status: 400 });
    }

    // DB 업데이트: user.my_plan에 planId 저장
    await prisma.user.update({
      where: { id: session.user.id },
      data: { my_plan: planId },
    });

    console.log(
      `요금제 저장 성공 planId: ${planId}, userId: ${session.user.id}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("요금제 저장 실패:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
