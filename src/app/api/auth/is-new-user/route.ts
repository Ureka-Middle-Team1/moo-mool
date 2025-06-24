import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // 미들웨어에서 인증을 통과했지만, 세션 정보가 없는 경우 서버 오류로 처리
  if (!session?.user?.email) {
    console.error(
      "is-new-user: middleware passed but session or user email is missing."
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // 3분 이내 가입자만 조회
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
      created_at: {
        gte: new Date(Date.now() - 5 * 60 * 1000),
      },
    },
  });

  return NextResponse.json({ isNew: !!user });
}
