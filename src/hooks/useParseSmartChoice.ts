import { RawPlan } from "@/types/Chat";
import { Prisma } from "@prisma/client";

// Prisma.PlanCreateInput과 동일한 타입 정의
export type CleanedPlan = Omit<Prisma.PlanCreateInput, "id">;

export function parseSmartChoiceToPlan(raw: RawPlan): CleanedPlan {
  const parseMinutes = (text: string) => {
    const match = text.match(/(\d+)\s*분/);
    return match ? parseInt(match[1]) : -1;
  };

  const parseDataAmount = (text: string) => {
    if (text.includes("무제한")) return 999999; // MB 단위 기준 무제한

    const gbMatch = text.match(/([\d.]+)\s*GB/);
    if (gbMatch) return parseFloat(gbMatch[1]) * 1024;

    const mbMatch = text.match(/([\d.]+)\s*MB/);
    if (mbMatch) return parseFloat(mbMatch[1]);

    return 0;
  };

  const parseOverageSpeed = (text: string) => {
    const mbpsMatch = text.match(/(\d+(?:\.\d+)?)\s*Mbps/);
    if (mbpsMatch) return parseFloat(mbpsMatch[1]);

    const kbpsMatch = text.match(/(\d+(?:\.\d+)?)\s*kbps/i);
    if (kbpsMatch) return parseFloat(kbpsMatch[1]) / 1000;

    return null;
  };
  return {
    name: raw.v_plan_name._text.trim(),
    price: Number(raw.v_plan_price._text),
    dataAmountMb: parseDataAmount(raw.v_plan_display_data._text),
    overageSpeedMbps: parseOverageSpeed(raw.v_plan_display_data._text),
    voiceMinutes: parseMinutes(raw.v_plan_display_voice._text),
    smsIncluded: raw.v_plan_display_sms._text.includes("기본") ? 45200 : 0,
    networkType: "LTE", // 현재 SmartChoice 응답엔 없으므로 고정
    subscriptionServices: [], // 기본 빈 배열로 저장
  };
}
