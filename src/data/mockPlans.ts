export interface Plan {
  rank: number;
  title: string;
  subtitle: string;
  detail: string;
}

export const mockPlans: Plan[] = [
  {
    rank: 1,
    title: "5G 프리미엄 플러스",
    subtitle: "데이터 무제한",
    detail: "테더링 + 쉐어링 1000GB",
  },
  {
    rank: 2,
    title: "5G 프리미엄 플러스",
    subtitle: "데이터 무제한",
    detail: "테더링 + 쉐어링 2000GB",
  },
  {
    rank: 3,
    title: "5G 프리미엄 플러스",
    subtitle: "데이터 무제한",
    detail: "테더링 + 쉐어링 3000GB",
  },
];

export const trendData = [
  { label: "SNS", value: 60 },
  { label: "Youtube", value: 85 },
  { label: "Chat", value: 45 },
  { label: "Calling", value: 70 },
  { label: "Books", value: 30 },
  { label: "Saving", value: 15 },
];

export const descriptionText = `"한 편만 본다더니 시즌 정주행한 나 자신… 또 속았지 뭐야?" 영화, 드라마, 예능, 유튜브, 숏폼까지! 당신의 하루는 스크린 속에서 시작되고 끝나요. 시간만 나면 넷플릭스 켜고, 잠들기 전엔 유튜브 한 편은 필수. '이거 안 보면 대화 못 껴'라는 핑계로 모든 콘텐츠를 섭렵하는 당신은, 세상의 모든 스트리밍을 책임지는 정통 무너계의 "콘텐츠 요정!" 오늘도 플레이 버튼을 눌러주세요. 끝나지 않는 재미가 기다리고 있어요.`;
export const hashtagText = "정주행은_못참지 정주행은_못참지 정주행은_못참지";
