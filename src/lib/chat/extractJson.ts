// GPT 응답 형식에서 <FIELDS> 태그 사이의 JSON을 추출하는 함수 (-> "자연스러운 요금제 추천" 모드에서만 사용 예정)
function extractJson(text: string): Record<string, string> {
  const match = text.match(/<FIELDS>([\s\S]*?)<\/FIELDS>/);
  if (!match) throw new Error("FIELDS 태그 내부 JSON을 찾을 수 없습니다.");

  try {
    return JSON.parse(match[1].trim());
  } catch (err) {
    throw new Error("FIELDS 내부 JSON 파싱 실패: " + err);
  }
}
