import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params; //핵심 수정 (15.3.3 대응

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
