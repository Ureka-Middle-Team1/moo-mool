import { NextRequest, NextResponse } from "next/server";

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

    const updated = await prisma?.user.update({
      where: { id: inviterId },
      data: {
        invited_count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      invited_count: updated?.invited_count,
    });
  } catch (err) {
    console.error("invited_count 증가 오류", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
