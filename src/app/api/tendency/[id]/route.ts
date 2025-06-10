import { NextRequest, NextResponse } from 'next/server';

const tendencySamples: Record<string, { name: string; data: number[] }> = {
  '3': {
    name: '5G 프리미엄 플러스',
    data: [77, 50, 50, 97, 80],
  },
  // '4': {
  //   name: 'LTE 실속 요금제',
  //   data: [30, 30, 60, 60, 60],
  // },
  // 기존 요금제 비교 데이터
};

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const sample = tendencySamples[id];

  if (!sample) {
    return NextResponse.json(
      { success: false, message: `해당 id(${id})에 대한 데이터가 없습니다.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    name: sample.name,
    radar: sample.data,
    bar: sample.data,
  });
}
