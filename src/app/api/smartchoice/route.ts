import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import convert from "xml-js";
import { ElementCompact } from "xml-js";

// Error가 발생했을 경우 response를 json으로 통일하는 간단한 메소드
function createErrorResponse(message: string, status: number = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { voice, data, sms, age, type, dis } = body;

    // 프로젝트 root 폴더의 '.env.local' 파일에서 RECOMMENDATION_API_KEY 값을 가져온다
    const RECOMMENDATION_API_KEY = process.env.RECOMMENDATION_API_KEY;
    if (!RECOMMENDATION_API_KEY) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }
    const url = `https://www.smartchoice.or.kr/api/openAPI.xml?authkey=${RECOMMENDATION_API_KEY}&voice=${voice}&data=${data}&sms=${sms}&age=${age}&type=${type}&dis=${dis}`;

    const response = await axios.get(url);
    const xmlData = response.data;

    /**
     * 요금제 추천 API 요청
     *
     * voice - 월 평균 통화량 (입력단위:분)
     * data - 월 평균 데이터 사용량 (입력단위:MB)
     * sms - 월 평균 문자 발송량 (입력단위:건)
     * age - 연령(성인:20, 청소년:18, 실버:65) => 실제 입력에서는 99살까지는 결과가 출력됩니다.
     * type - 서비스 타입(3G:2, LTE:3, 5G:6)
     * dis - 약정기간 (무약정:0, 12개월:12, 24개월:24)
     */

    // 응답은 xml로 전달됨 -> 해당 값을 json 형태로 변환
    const jsonData = convert.xml2js(xmlData, {
      compact: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
    }) as ElementCompact;

    const rawItems = jsonData?.root?.items?.item;

    // 추천된 요금제가 없으면
    if (!rawItems) {
      return NextResponse.json({
        success: true,
        result: [],
      });
    }

    // "LGU+" 요금제만 필터링 해야한다
    const filteredItems = Array.isArray(rawItems)
      ? rawItems.filter((item) => item.v_tel?._text === "LGU+")
      : rawItems.v_tel?._text === "LGU+"
        ? [rawItems]
        : [];

    // 추천된 요금제를 반환한다
    return NextResponse.json({
      success: true,
      result: filteredItems,
    });
  } catch (error) {
    // 에러 처리
    const msg = error instanceof Error ? error.message : "알 수 없는 오류";
    console.error("요금제 추천 API 오류:", msg);
    return createErrorResponse("요금제 추천 실패: " + msg);
  }
}
