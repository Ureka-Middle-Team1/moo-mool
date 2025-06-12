// lib/chat/queryBySubscribe.ts

import { Plan } from "@type/Plan"; // 요금제 타입 정의 (추후 DB 모델 연동)
// import { prisma } from "@/lib/prisma"; // Prisma 사용 시

type SourceTaggedPlan = {
  source: "PERFECT_MATCH" | "SUBSCRIBE";
  plan: Plan;
};

/**
 * SmartChoice API로 받은 요금제 이름들과 구독 서비스 문자열을 기반으로
 * 데이터베이스에서 일치하는 요금제를 조회한다.
 *
 * 1. name + subscribe 모두 일치하는 요금제가 있으면 → 그것들만 반환
 * 2. 없다면 → subscribe 값만 일치하는 요금제 최대 2개 + SmartChoice 요금제 최대 2개 반환
 *
 * @param smartChoicePlans Smart Choice에서 받은 요금제 이름 배열
 * @param subscribe 구독 서비스 문자열 (예: 'NETFLIX')
 * @returns 일치하는 Plan 객체 배열 (최대 4개)
 */
export async function queryBySubscribe({
  smartChoicePlans,
  subscribe,
}: {
  smartChoicePlans: Plan[] | undefined;
  subscribe: string | undefined;
}): Promise<SourceTaggedPlan[]> {
  // 경우 1 - 이름 + 구독 서비스가 모두 일치하는 DB 요금제 (DB 연동하면 주석 처리된 아래 코드로 활용 예정)
  // const perfectMatches = await prisma.plan.findMany({
  //   where: {
  //     name: { in: names },
  //     subscribe,
  //   },
  //   take: 2,
  // });

  // 오류를 피하기 위한 Dummy Data
  const perfectMatches: Plan[] = [];

  if (perfectMatches.length > 0) {
    // 경우 1에 대한 조회 결과가 존재하는 경우
    return perfectMatches.map((plan) => ({
      source: "PERFECT_MATCH",
      plan,
    }));
  }

  // 경우 2 - 이름+구독 일치 요금제가 없을 때 => fallback 전략 수행 (DB 연동하면 주석 처리된 아래 코드로 활용 예정)
  // const subscribeOnly = await prisma.plan.findMany({
  //   where: { subscribe },
  //   take: 2,
  // });

  // 오류를 피하기 위한 Dummy Data
  const subscribeOnly: Plan[] = [
    {
      v_tel: "SKT",
      v_plan_price: "55000", // 원 단위 예상 금액
      v_dis_price: "11000", // 약정 할인 금액
      v_plan_over: "데이터 1GB당 2200원", // 초과 사용 요금
      v_add_name: "기본료 + 부가서비스", // 요금제 기본료 + 부가서비스
      v_plan_name: "T플랜 에센스", // 요금제명
      v_plan_display_voice: "무제한", // 음성 제공량
      v_display_data: "11GB + 매일 2Mbps", // 데이터 제공량
      v_plan_sms: "기본제공", // 문자 제공량
      rn: "1", // 추천 구분: 1=으뜸
    },
  ];

  // Smart Choice와는 관계 없는.. 오직 DB의 구독제 관련 정보를 보고 뽑아온 애들
  const taggedSubscribeOnly: SourceTaggedPlan[] = subscribeOnly.map((plan) => ({
    source: "SUBSCRIBE",
    plan,
  }));

  return [...taggedSubscribeOnly];
}
