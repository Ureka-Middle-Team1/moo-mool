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
  "DISNEY+": {
    imageSrc: "/assets/ott/disney.jpg",
    title: "디즈니 플러스 3개월",
    description:
      "이 요금제와 함께 디즈니 플러스 3개월 구독권을 무료로 누려보세요",
  },
  WAVVE: {
    imageSrc: "/assets/ott/wavve.png",
    title: "웨이브 3개월",
    description: "이 요금제와 함께 웨이브 3개월 구독권을 무료로 누려보세요",
  },
  TVING: {
    imageSrc: "/assets/ott/tving.png",
    title: "티빙 3개월",
    description: "이 요금제와 함께 티빙 3개월 구독권을 무료로 누려보세요",
  },
  MILLIE: {
    imageSrc: "/assets/ott/millie.png",
    title: "밀리의 서재 3개월",
    description: "이 요금제와 함께 밀리의 서재 3개월 구독권을 무료로 누려보세요",
  },
};

function getBenefits(services: string[]): PlanDetailData["benefits"] {
  return services
    .map((s) => serviceMap[s])
    .filter((b): b is PlanDetailData["benefits"][number] => b !== undefined);
}

function getNetworkTypeLabel(type: "LTE" | "FIVE_G"): string {
  return type === "FIVE_G" ? "5G" : "LTE";
}

function normalize(value: number, min: number, max: number) {
  if (max === min) return 50;
  const clamped = Math.min(Math.max(value, min), max);
  return Math.round(((clamped - min) / (max - min)) * 100);
}

export function mapPlanToDetailData(
  plan: PlanDBApiResponse,
  context: ScoreContext,
  comparePlan?: PlanDBApiResponse
): PlanDetailData {
  const priceScore = normalize(plan.price, 0, 105000);
  const dataScore = normalize(plan.dataAmountMb ?? 0, 0, 300000);
  const speedScore = normalize(plan.overageSpeedMbps ?? 0, 0, 8000);
  const voiceScore = normalize(plan.voiceMinutes ?? 0, 0, 400);
  const smsScore = normalize(plan.smsIncluded ?? 0, 0, 45200);

  const scoreArray = [priceScore, dataScore, speedScore, voiceScore, smsScore];

  const rawArray = [
    plan.price,
    plan.dataAmountMb ?? 0,
    plan.overageSpeedMbps ?? 0,
    plan.voiceMinutes ?? 0,
    plan.smsIncluded ?? 0,
  ];

  const compare = comparePlan
    ? [
        normalize(comparePlan.price, 0, 105000),
        normalize(comparePlan.dataAmountMb ?? 0, 0, 300000),
        normalize(comparePlan.overageSpeedMbps ?? 0, 0, 8000),
        normalize(comparePlan.voiceMinutes ?? 0, 0, 400),
        normalize(comparePlan.smsIncluded ?? 0, 0, 45200),
      ]
    : [];

  const compareRaw = comparePlan
    ? [
        comparePlan.price,
        comparePlan.dataAmountMb ?? 0,
        comparePlan.overageSpeedMbps ?? 0,
        comparePlan.voiceMinutes ?? 0,
        comparePlan.smsIncluded ?? 0,
      ]
    : [];

  return {
    name: plan.name,
    price: `월 ${plan.price.toLocaleString()} 원`,
    tags: plan.badges,
    radar: scoreArray,
    bar: scoreArray,
    raw: rawArray,
    compare,
    compareRaw,
    benefits: getBenefits(plan.subscriptionServices),
  };
}
