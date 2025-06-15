import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; //핵심 수정 (15.3.3 대응)
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return NextResponse.json(
      { error: "유효한 숫자 ID가 아닙니다." },
      { status: 400 }
    );
  }

  try {
    const plan = await prisma.plan.findUnique({ where: { id: idNum } });

    if (!plan) {
      return NextResponse.json(
        { error: "해당 ID의 요금제를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...plan,
      subscriptionServices: Array.isArray(plan.subscriptionServices)
        ? plan.subscriptionServices
        : [],
    });
  } catch (error) {
    console.error("[PLAN_ID_GET_ERROR]", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
