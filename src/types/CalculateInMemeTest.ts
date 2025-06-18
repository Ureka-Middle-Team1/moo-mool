// 밈 테스트 결과 -> Smart Choice API request body를 만들기 위해 사용되는 type들
export type UserMemeTestResult = {
  call_level: number; // 0~100
  sms_level: number; // 0~100
  sns_level: number; // 0~100
  youtube_level: number; // 0~100
  saving_level: number; // 0~100
  book_level: number;
  type?: string;
  plan_id?: number;
};

// Smart Choice API에 넘길 때는 해당 값들을 각각 string으로 변환해서 넘겨야 한다!
export type SmartChoiceInput = {
  call: string; // 분
  sms: string; // 건
  data: string; // MB
};
