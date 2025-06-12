import { Plan } from "@prisma/client";
import { PlanDetailData } from "@/types/planDetail";

export function mapPlanToDetailData(plan: Plan): PlanDetailData {
  console.log(plan);
  return {
    name: plan.name,
    price: `월 ${plan.price.toLocaleString()} 원`,
    tags:
      Array.isArray(plan.tags) && plan.tags.length > 0
        ? (plan.tags as string[])
        : ["데이터 무제한", "통화+문자 기본제공"],

    // 임의 점수: 실제로는 분석 알고리즘이나 LLM이 추천한 점수 등
    radar: [77, 50, 50, 97, 80],
    bar: [77, 50, 50, 97, 80],
    compare: [40, 82, 84, 43, 59],

    // 부가 혜택 설명 - add_on_description 또는 추천 기반 더미 구성
    benefits: [
      {
        imageSrc: "/assets/ott/netflix.jpg",
        title: "넷플릭스 3개월",
        description:
          "이 요금제와 함께 넷플릭스 3개월 구독권을 무료로 누려보세요",
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
}
