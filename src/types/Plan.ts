// Smart Choice API 응답 시 받는 자료형
export interface Plan {
  v_tel: string; // 이동통신사(SKT,KT,LGU+)
  v_plan_price: string; // 예상 금액
  v_dis_price: string; // 약정 할인 금액
  v_plan_over: string; // 기본 제공량 초과 사용량과 금액
  v_add_name: string; // 요금제 기본료, 부가서비스 기본료
  v_plan_name: string; // 요금제명, 부가서비스명
  v_plan_display_voice: string; // 음성 기본 제공량
  v_display_data: string; // 데이터 기본 제공량
  v_plan_sms: string; // 문자 기본 제공량
  rn: string; // 요금제 추천 구분(으뜸: 1, 알뜰: 2, 넉넉: 3)
}

// PlanDB 조회 응답 구조
export interface PlanApiResponse {
  id: number;
  name: string;
  price: number;
  dataAmountGb: number;
  overageSpeedMbps: number | null;
  voiceMinutes: number;
  smsIncluded: boolean;
  networkType: "LTE" | "5G";
  subscriptionServices: string[];
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
