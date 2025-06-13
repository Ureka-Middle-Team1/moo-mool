import { PlanDetailData } from "@/types/planDetail";
import { ScoreContext } from "./planScore";
import { PlanDBApiResponse } from "@/types/PlanData";

const serviceMap: Record<string, PlanDetailData["benefits"][number]> = {
  NETFLIX: {
    imageSrc: "/assets/ott/netflix.jpg",
    title: "넷플릭스 3개월",
    description: "이 요금제와 함께 넷플릭스 3개월 구독권을 무료로 누려보세요",
  },
  YOUTUBE_PREMIUM: {
    imageSrc: "/assets/ott/youtubePremium.png",
    title: "유튜브 프리미엄 3개월",
    description:
      "이 요금제와 함께 유튜브 프리미엄 3개월 구독권을 무료로 누려보세요",
  },
  WATCHA: {
    imageSrc: "/assets/ott/watcha.jpg",
    title: "왓챠 3개월",
    description: "이 요금제와 함께 왓챠 3개월 구독권을 무료로 누려보세요",
  },
};

function getBenefits(services: string[]): PlanDetailData["benefits"] {
  return services
    .map((s) => serviceMap[s])
    .filter((b): b is PlanDetailData["benefits"][number] => b !== undefined);
}
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
  const speedScore = normalize(
    plan.overageSpeedMbps ?? 0,
    context.minSpeed,
    context.maxSpeed
  );

  const smsScore = plan.smsIncluded ? 100 : 0;

  return {
    name: plan.name,
    price: `월 ${plan.price.toLocaleString()} 원`,
    tags: ["정제된 태그", "LTE", "혜택 풍부"],

    radar: [priceScore, dataScore, speedScore, voiceScore, smsScore],
    bar: [
      plan.price,
      plan.dataAmountMb ?? 0,
      plan.overageSpeedMbps ?? 0,
      plan.voiceMinutes < 0 ? 9999 : plan.voiceMinutes,
      plan.smsIncluded ? 1 : 0,
    ],
    compare: [40, 82, 84, 43, 59],

    benefits: getBenefits(plan.subscriptionServices),
  };
}
