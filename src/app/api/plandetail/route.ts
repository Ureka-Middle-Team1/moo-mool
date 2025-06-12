import { NextRequest, NextResponse } from "next/server";

const planDetailSample = {
  name: "5G 프리미엄 플러스",
  price: "월 10,500 원",
  tags: ["OTT 구독 반값", "통화 무제한", "테더링 쉐어 1000GB"],
  radar: [77, 50, 50, 97, 80],
  bar: [77, 50, 50, 97, 80],
  compare: [40, 82, 84, 43, 59],
  benefits: [
    {
      imageSrc: "/assets/ott/netflix.jpg",
      title: "넷플릭스 3개월",
      description: "이 요금제와 함께 넷플릭스 3개월 구독권을 무료로 누려보세요",
    },
    {
      imageSrc: "/assets/ott/youtubePremium.png",
      title: "유튜브 프리미엄 3개월",
      description:
        "이 요금제와 함께 유튜브 프리미엄 3개월 구독권을 무료로 누려보세요",
    },
    {
      imageSrc: "/assets/ott/watcha.jpg",
      title: "왓챠 3개월",
      description: "이 요금제와 함께 왓챠 3개월 구독권을 무료로 누려보세요",
    },
  ],
};

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    ...planDetailSample,
  });
}
