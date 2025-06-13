import { PlanDetailData } from "@/types/planDetail";
import { ScoreContext } from "./planScore";
import { PlanDBApiResponse } from "@/types/PlanData";

function normalize(value: number, min: number, max: number) {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}

export function mapPlanToDetailData(
  plan: PlanDBApiResponse,
  context: ScoreContext
): PlanDetailData {
  const dataScore = normalize(
    plan.dataAmountMb ?? 0,
    context.minData,
    context.maxData
  );
  const voiceScore = normalize(
    plan.voiceMinutes < 0 ? 9999 : (plan.voiceMinutes ?? 0),
    context.minVoice,
    context.maxVoice
  );
  const priceScore =
    100 - normalize(plan.price, context.minPrice, context.maxPrice); // 낮을수록 좋음

  return {
    name: plan.name,
    price: `월 ${plan.price.toLocaleString()} 원`,
    tags: ["정제된 태그", "LTE", "혜택 풍부"],

    radar: [dataScore, voiceScore, priceScore, 70, 80],
    bar: [dataScore, voiceScore, priceScore, 70, 80],
    compare: [40, 82, 84, 43, 59],

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
    ],
  };
}
