import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  // 미들웨어에서 인증을 통과했지만, 세션 정보가 없는 경우 서버 오류로 처리
  if (!session?.user?.id) {
    console.error(
      "my-plan: middleware passed but session or user id is missing."
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const userId = session.user.id;

  const typeNameMap: Record<string, string> = {
    SNS: "인싸 무너",
    Youtube: "팝콘 무너",
    Chat: "투머치톡커 무너",
    Calling: "여보세무너",
    Books: "꼬꼬무너",
    Saving: "알뜰 무너",
  };

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        my_plan: true,
        invited_count: true,
        characterProfile: {
          select: {
            type: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: user?.id,
      email: user?.email,
      my_plan: user?.my_plan,
      invited_count: user?.invited_count,
      type: user?.characterProfile?.type
        ? (typeNameMap[user.characterProfile.type] ??
          user.characterProfile.type)
        : null,
    });
  } catch (error) {
    console.error("Error fetching my plan:", error);
    return NextResponse.json(
      { error: "Failed to fetch my plan" },
      { status: 500 }
    );
  }
}
