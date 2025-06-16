import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const profile = await prisma.userCharacterProfile.findUnique({
      where: { user_id: userId },
      include: {
        plan: true, // 연결된 요금제 정보도 포함
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
