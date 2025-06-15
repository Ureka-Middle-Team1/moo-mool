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
  const clamped = Math.min(Math.max(value, min), max);
  return Math.round(((clamped - min) / (max - min)) * 100);
}

export function mapPlanToDetailData(
  plan: PlanDBApiResponse,
  context: ScoreContext
): PlanDetailData {
  const priceScore = 100 - normalize(plan.price, 10000, 105000);
  const dataScore = normalize(
    (plan.dataAmountMb ?? 0) > 999999 ? 300000 : (plan.dataAmountMb ?? 0),
    0,
    300000
  );
  const speedScore = normalize(plan.overageSpeedMbps ?? 0, 0, 5);
  const voiceScore = normalize(
    plan.voiceMinutes < 0 ? 9999 : (plan.voiceMinutes ?? 0),
    0,
    400
  );
  const smsScore = plan.smsIncluded ? 100 : 0;

  const scoreArray = [priceScore, dataScore, speedScore, voiceScore, smsScore];

  return {
    name: plan.name,
    price: `월 ${plan.price.toLocaleString()} 원`,
    tags: ["정제된 태그", plan.networkType, "혜택 풍부"],
    radar: scoreArray,
    bar: scoreArray,
    compare: [40, 82, 84, 43, 59],
    benefits: getBenefits(plan.subscriptionServices),
  };
}
