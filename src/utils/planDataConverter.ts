import { ParsedPlanWithID } from "@/types/Chat";
import { PlanDBApiResponse } from "@/types/PlanData";

/**
 * ParsedPlanWithID를 PlanDBApiResponse로 변환하는 유틸리티 함수
 * 챗봇 결과를 PlanListCard에서 사용할 수 있도록 변환
 */
export function convertToPlanDBApiResponse(
  planData: ParsedPlanWithID
): PlanDBApiResponse {
  // 데이터 용량 추출 (예: "5GB + 1Mbps 속도제어" → 5120)
  const dataMatch = planData.data.match(/(\d+(?:\.\d+)?)GB/);
  const dataAmountMb = dataMatch
    ? Math.round(parseFloat(dataMatch[1]) * 1024)
    : 0;

  // 속도 제어 추출 (예: "5GB + 1Mbps 속도제어" → 1)
  const speedMatch = planData.data.match(/(\d+)Mbps/);
  const overageSpeedMbps = speedMatch ? parseInt(speedMatch[1]) : null;

  // 음성 통화 분 추출 (예: "100분 제공" → 100)
  const voiceMatch = planData.voice.match(/(\d+)분/);
  const voiceMinutes = voiceMatch ? parseInt(voiceMatch[1]) : 0;

  // SMS 포함 여부 (예: "기본제공" → 1, "제공되지 않음" → 0)
  const smsIncluded = planData.sms.includes("제공") ? 1 : 0;

  // 가격 추출 (예: "29,000원" → 29000)
  const priceMatch = planData.price.match(/(\d+(?:,\d+)*)/);
  const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, "")) : 0;

  // 네트워크 타입 추론
  const networkType = planData.tel.includes("LGU") ? "LTE" : "LTE"; // 기본값

  return {
    id: planData.id,
    name: planData.name,
    price,
    dataAmountMb,
    overageSpeedMbps,
    voiceMinutes,
    smsIncluded,
    networkType,
    subscriptionServices: planData.subscriptionServices || [], // 챗봇 결과에서 구독 서비스 정보 사용
    badges: [],
  };
}
