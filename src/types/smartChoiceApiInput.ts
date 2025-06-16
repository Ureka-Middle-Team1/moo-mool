// Smart Choice API 호출 시 보내야 할 input 자료형
export interface SmartChoiceApiInput {
  voice: string; // 월 평균 통화량 (입력단위:분, 무제한:999999)
  data: string; // 월 평균 데이터 사용량 (입력단위:MB, 무제한:999999)
  sms: string; // 월 평균 문자 발송량 (입력단위:건, 무제한:999999)
  age: string; // 연령(성인:20, 청소년:18, 실버:65)
  type: string; // 서비스 타입(3G:2, LTE:3, 5G:6)
  dis: string; // 약정기간 (무약정:0, 12개월:12, 24개월:24)
}
