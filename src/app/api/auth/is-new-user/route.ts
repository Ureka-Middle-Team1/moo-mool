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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user?.created_at) {
    return NextResponse.json({ isNew: false }, { status: 404 });
  }

  const now = new Date();
  const createdAt = new Date(user.created_at);
  const diffInMinutes = (now.getTime() - createdAt.getTime()) / 1000 / 60;

  // 가입한 지 3분 이내면 신규 사용자로 간주
  const isNew = diffInMinutes < 3;

  return NextResponse.json({ isNew });
}
