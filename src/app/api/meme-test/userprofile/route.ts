import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DB의 userCharactorProfile 테이블에서 user_id에 해당하는 값들을 GET 해온다
export async function GET(request: Request) {
  try {
    // request.url 기반으로 user_id를 읽는 구조
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("user_id");
    if (!userIdParam) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }

    // findUnique(..select..)를 통해, 필요한 필드만 효율적으로 조회함
    const profile = await prisma.userCharacterProfile.findUnique({
      where: { user_id: userIdParam },
      select: {
        call_level: true,
        sms_level: true,
        sns_level: true,
        youtube_level: true,
        saving_level: true,
        book_level: true,
      },
    });

    // 가져온 프로필이 없는 경우
    if (!profile) {
      return NextResponse.json(
        { error: `Profile not found for user_id ${userIdParam}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ userIdParam, ...profile }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/userprofile] error", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
