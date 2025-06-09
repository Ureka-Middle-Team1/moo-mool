
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const mockPlan = {
    success: true,
    message: "요금제 정보를 성공적으로 불러왔습니다.",
    response: {
      planId: parseInt(id),
      carrier: "LGU+",
      price: 10500,
      displayPrice: "10,500원",
      name: "5G 프리미엄 플러스",
      voice: "무제한",
      data: "데이터 쉐어 100GB",
      sms: "무제한",
      networkType: "5G",
    },
    error: null
  };

  return NextResponse.json(mockPlan);
}