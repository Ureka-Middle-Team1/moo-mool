import { NextRequest, NextResponse } from "next/server";

// 테스트용 mock 데이터
const tendencySamples: Record<string, number[]> = {
  "3": [60, 90, 40, 70, 25, 10],
  "4": [75, 85, 60, 55, 35, 20],
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // 또는 regex로 추출

  if (!id || !tendencySamples[id]) {
    return NextResponse.json(
      {
        success: false,
        message: `해당 id(${id})에 대한 통신 성향 데이터가 없습니다.`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: tendencySamples[id],
  });
}
