import { NextRequest, NextResponse } from 'next/server';

const tendencySamples: Record<
  string,
  {
    name: string;
    price: string;
    tags: string[];
    data: number[];
    compare: number[];
    benefits: { imageSrc: string; title: string; description: string }[];
  }
> = {
  '3': {
    name: '5G 프리미엄 플러스',
    price: '월 10,500 원',
    tags: ['OTT 구독 반값', '통화 무제한', '테더링 쉐어 1000GB'],
    data: [77, 50, 50, 97, 80],
    compare: [40, 82, 84, 43, 59],
    benefits: [
      {
        imageSrc: '/netflix.jpg',
        title: '넷플릭스 3개월',
        description: '이 요금제와 함께 넷플릭스 3개월 구독권을 무료로 누려보세요',
      },
      {
        imageSrc: '/youtubePremium.png',
        title: '유튜브 프리미엄 3개월',
        description: '이 요금제와 함께 유튜브 프리미엄 3개월 구독권을 무료로 누려보세요',
      },
      {
        imageSrc: '/watcha.jpg',
        title: '왓챠 3개월',
        description: '이 요금제와 함께 왓챠 3개월 구독권을 무료로 누려보세요',
      },
    ],
  },
};

export async function GET(req: NextRequest) {
  const samples = Object.values(tendencySamples);

  if (samples.length === 0) {
    return NextResponse.json(
      { success: false, message: `데이터가 없습니다.` },
      { status: 404 }
    );
  }

  const sample = samples[0];

  return NextResponse.json({
    success: true,
    name: sample.name,
    price: sample.price,
    tags: sample.tags,
    radar: sample.data,
    bar: sample.data,
    compare: sample.compare,
    benefits: sample.benefits,
  });
}
