import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/axiosInstance";
import { parseSmartChoiceXml } from "@/lib/parseSmartChoiceXml";
import { extractRawPlan } from "@/types/Chat";
import { RawPlan } from "@/types/Chat";
import { parseSmartChoiceToPlan } from "@/hooks/useParseSmartChoice";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { voice, data, sms, age, type, dis } = body;

    const RECOMMENDATION_API_KEY = process.env.RECOMMENDATION_API_KEY;
    if (!RECOMMENDATION_API_KEY) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const url = `https://www.smartchoice.or.kr/api/openAPI.xml?authkey=${RECOMMENDATION_API_KEY}&voice=${voice}&data=${data}&sms=${sms}&age=${age}&type=${type}&dis=${dis}`;

    const response = await client.get(url, {
      headers: { Accept: "application/xml" },
    });

    const xmlData = response.data;
    const result = parseSmartChoiceXml(xmlData);

    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "API에서 받은 결과가 비어 있습니다." },
        { status: 400 }
      );
    }

    let rawPlans: RawPlan[];
    try {
      rawPlans = result.map(extractRawPlan);
    } catch (err) {
      console.error("SmartChoice 응답 정제 중 오류:", err);
      return NextResponse.json(
        { success: false, error: "SmartChoice 응답 형식이 잘못되었습니다." },
        { status: 500 }
      );
    }

    const cleanedPlans = rawPlans.map(parseSmartChoiceToPlan);

    const savedPlans = await Promise.all(
      cleanedPlans.map(async (plan) => {
        try {
          const exists = await prisma.plan.findUnique({
            where: { name: plan.name },
          });
          if (!exists) {
            return await prisma.plan.create({ data: plan });
          }
          return exists;
        } catch (err) {
          console.error(`plan 저장 중 오류: ${plan.name}`, err);
          return null;
        }
      })
    );

    const filteredPlans = savedPlans.filter((p) => p !== null);

    return NextResponse.json({
      success: true,
      savedPlans: filteredPlans,
      rawPlans,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "알 수 없는 오류";
    console.error("요금제 추천 API 오류:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
