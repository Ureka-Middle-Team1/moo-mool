import { NextRequest, NextResponse } from 'next/server';

const tendencySamples: Record<
  string,
  { name: string; price: string; tags: string[]; data: number[] }
> = {
  '3': {
    name: '5G 프리미엄 플러스',
    price: '월 10,500 원',
    tags: ['OTT 구독 반값', '통화 무제한', '테더링 쉐어 1000GB'],
    data: [77, 50, 50, 97, 80],
  },
};

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const sample = tendencySamples[id];

  if (!sample) {
    return NextResponse.json(
      {
        success: false,
        message: `해당 id(${id})에 대한 데이터가 없습니다.`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    name: sample.name,
    price: sample.price,
    tags: sample.tags,
    radar: sample.data,
    bar: sample.data,
  });
}
