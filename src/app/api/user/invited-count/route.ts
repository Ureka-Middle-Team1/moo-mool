import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 초대한 사용자의 invited_count를 1 증가시키는 API
export async function POST(req: NextRequest) {
  try {
    const { inviterId } = await req.json();

    if (!inviterId) {
      return NextResponse.json(
        { error: "inviterId가 없습니다." },
        { status: 400 }
      );
    }

    // 유효한 사용자 ID인지 확인
    const inviter = await prisma.user.findUnique({ where: { id: inviterId } });
    if (!inviter) {
      return NextResponse.json(
        { error: "해당 inviterId가 존재하지 않습니다." },
        { status: 404 }
      );
    }

    // 초대한 사람의 초대 카운트 1 증가
    const updated = await prisma.user.update({
      where: { id: inviterId },
      data: {
        invited_count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      invited_count: updated.invited_count,
    });
  } catch (err) {
    console.error("invited_count 증가 오류", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
