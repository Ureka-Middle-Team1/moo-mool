import { ParsedPlanWithID } from "@/types/Chat";
import { JsonValue } from "@prisma/client/runtime/library";

// DB로부터 가져온 정보를 바탕으로 ParsedPlanWithID으로 변환하는 planToParsedPlanWithID
export function dbPlanToParsedPlanWithID(plan: {
  id: number;
  name: string;
  price: number;
  dataAmountMb: number;
  overageSpeedMbps: number | null;
  voiceMinutes: number;
  smsIncluded: number;
  subscriptionServices?: JsonValue; // 구독 서비스 정보 추가
}): ParsedPlanWithID {
  const services =
    Array.isArray(plan.subscriptionServices) && // DB엔 subscriptionServies가 JsonValue -> string[]으로 변환
    plan.subscriptionServices.every((item) => typeof item === "string")
      ? (plan.subscriptionServices as string[])
      : [];

  // 데이터 표시
  const data =
    plan.dataAmountMb === 999999
      ? "무제한"
      : `${(plan.dataAmountMb / 1024).toFixed(1)}GB` + // MB -> GB 단위로 변환
        (plan.overageSpeedMbps
          ? ` + ${plan.overageSpeedMbps}Mbps 속도제어`
          : "");

  // 음성 통화 표시
  const voice =
    plan.voiceMinutes === 999999
      ? "무제한"
      : plan.voiceMinutes > 0
        ? `${plan.voiceMinutes}분 제공`
        : "제공 없음";

  // 문자 제공 여부 표시
  const sms =
    plan.voiceMinutes === 999999
      ? "무제한"
      : plan.smsIncluded
        ? "기본제공"
        : "제공되지 않음";

  // 가격 표시
  const price = `${plan.price.toLocaleString()}원`;

  // 통신사 추론 (옵션)
  const tel = plan.name.includes("LGU")
    ? "LGU+"
    : plan.name.includes("KT")
      ? "KT"
      : plan.name.includes("SKT")
        ? "SKT"
        : "통신사 정보 없음";

  return {
    id: plan.id,
    name: plan.name,
    data,
    voice,
    sms,
    price,
    tel,
    subscriptionServices: services || [], // 구독 서비스 정보 포함
  };
}
