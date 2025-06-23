import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const session = await getServerSession(authOptions);

  // 미들웨어에서 인증을 통과했지만, 세션 정보가 없는 경우 서버 오류로 처리
  if (!session?.user?.id) {
    console.error(
      "user-character-profile: middleware passed but session or user id is missing."
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // 1. 로그인 여부는 미들웨어에서 처리
  // 2. 요청한 userId와 로그인한 사용자의 id가 같은지 확인 (인가 로직은 유지)
  // if (session.user.id !== userId) {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  try {
    const profile = await prisma.userCharacterProfile.findUnique({
      where: { user_id: userId },
      include: {
        plan: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "UserCharacterProfile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
