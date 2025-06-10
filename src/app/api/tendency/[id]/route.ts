import { NextRequest, NextResponse } from 'next/server';

// 테스트용 mock 데이터
const tendencySamples: Record<string, number[]> = {
  '3': [60, 90, 40, 70, 25, 10], // 둥근 그래프용
  '4': [75, 85, 60, 55, 35, 20]  // 각진 그래프용
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = tendencySamples[id];

  if (!result) {
    return NextResponse.json(
      {
        success: false,
        message: `해당 id(${id})에 대한 통신 성향 데이터가 없습니다.`
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: result
  });
}
