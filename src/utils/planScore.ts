import { PlanDBApiResponse } from "@/types/PlanData";

export interface ScoreContext {
  minData: number;
  maxData: number;
  minVoice: number;
  maxVoice: number;
  minPrice: number;
  maxPrice: number;
}

export function getScoreContext(plans: PlanDBApiResponse[]): ScoreContext {
  const dataList = plans.map((p) => p.dataAmountMb || 0);
  const voiceList = plans.map((p) =>
    p.voiceMinutes < 0 ? 9999 : p.voiceMinutes || 0
  );
  const priceList = plans.map((p) => p.price);

  return {
    minData: Math.min(...dataList),
    maxData: Math.max(...dataList),
    minVoice: Math.min(...voiceList),
    maxVoice: Math.max(...voiceList),
    minPrice: Math.min(...priceList),
    maxPrice: Math.max(...priceList),
  };
}
