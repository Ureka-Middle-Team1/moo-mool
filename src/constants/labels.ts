import { SortTarget } from "@/types/sort";

//차트 및 통계 카드에 표시될 한글 라벨 순서
export const LABELS: string[] = [
  "월정액",
  "데이터",
  "속도",
  "부가통화",
  "혜택가치",
];

//라벨 → SortTarget 매핑
export const LABEL_TO_SORTTARGET: Record<string, SortTarget> = {
  월정액: "price",
  데이터: "dataAmountMb",
  속도: "overageSpeedMbps",
  음성통화: "voiceMinutes",
  문자: "smsIncluded",
};

//SortTarget → 한글 라벨 매핑 (반대 방향)
export const SORTTARGET_TO_LABEL: Record<SortTarget, string> = {
  price: "월정액",
  dataAmountMb: "데이터",
  overageSpeedMbps: "속도",
  voiceMinutes: "음성통화",
  smsIncluded: "문자",
  subscriptionServices: "혜택 수",
};

//OTT 서비스 라벨 매핑
export const OTT_LABELS: Record<string, string> = {
  NETFLIX: "넷플릭스",
  YOUTUBE_PREMIUM: "유튜브 프리미엄",
  "DISNEY+": "디즈니+",
  WAVVE: "웨이브",
  TVING: "티빙",
  MILLIE: "밀리의 서재",
};

//네트워크 라벨 매핑
export const NETWORK_LABELS: Record<"LTE" | "5G", string> = {
  LTE: "LTE",
  "5G": "5G",
};
