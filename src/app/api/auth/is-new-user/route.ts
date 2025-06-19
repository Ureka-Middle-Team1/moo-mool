import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ isNew: false }, { status: 401 });
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
