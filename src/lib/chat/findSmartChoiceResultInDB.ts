import { ParsedPlanWithID, ParsedPlan } from "@/types/Chat";
import { prisma } from "@/lib/prisma"; // Prisma 사용 시
import { dbPlanToParsedPlanWithID } from "./dbPlanToParsedPlanWithID";

export async function findSmartChoiceResultInDB(
  smartChoicePlans: ParsedPlan[]
): Promise<ParsedPlanWithID[]> {
  // map 함수 사용해서, 이름 문자열 배열로 반환해야 한다
  const names = smartChoicePlans?.map((plan) => plan.name);

  //경우 1 - 이름 + 구독 서비스가 모두 일치하는 DB 요금제
  const smartChoicePlansInDB = await prisma.plan.findMany({
    where: {
      name: { in: names },
    },
    take: 2,
  });

  const results = smartChoicePlansInDB.map(dbPlanToParsedPlanWithID);

  // Smart Choice API로 가져온 친구들을 DB에서 찾은 결과를 돌려준다
  return results;
}
