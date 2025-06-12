// app/api/plan/[name]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const name = decodeURIComponent(params.name);

  try {
    const plan = await prisma.plan.findUnique({
      where: { name },
    });

    if (!plan) {
      return NextResponse.json(
        { error: "해당 이름의 요금제를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("[PLAN_GET_ERROR]", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
