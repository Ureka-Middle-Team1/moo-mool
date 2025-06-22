import { Plan } from "./Chat";
import { PrismaNetworkType } from "./network";

// Smart Choice API 응답 시 받는 자료형
export interface PlanDBApiResponse {
  id: number;
  name: string;
  price: number;
  dataAmountMb: number;
  overageSpeedMbps: number | null;
  voiceMinutes: number;
  smsIncluded: number;
  networkType: PrismaNetworkType;
  subscriptionServices: string[];
  badges: string[];
}

export type PlanSelectionInput = {
  smartChoicePlans: Plan[];
  subscribe: string;
};

export type PlanSelectionOutput = {
  type: "SMART_CHOICE_ONLY" | "SUBSCRIBE_MATCH" | "FALLBACK";
  smartChoicePlans?: Plan[]; // Smart Choice로 받아온 것은 없을 수도 있다
  subscribe?: string; // 구독 서비스에 대해 받아온 정보 또한 없을 수도 있다
};
