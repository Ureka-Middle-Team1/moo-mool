import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MemeType } from "@/store/memeTypeData";

const typeNameMap: Record<string, string> = {
  SNS: "인싸 무너",
  Youtube: "팝콘 무너",
  Chat: "투머치톡커 무너",
  Calling: "여보세무너",
  Books: "꼬꼬무너",
  Saving: "꽁돈 무너",
};

export async function GET() {
  const userAggregates = await prisma.user.aggregate({
    _sum: {
      tested_count: true,
      invited_count: true,
    },
  });

  const participantCount = userAggregates._sum.tested_count || 0;
  const sharedCount = userAggregates._sum.invited_count || 0;

  const totalProfiles = await prisma.userCharacterProfile.count();

  const countsByType = await prisma.userCharacterProfile.groupBy({
    by: ["type"],
    _count: {
      type: true,
    },
  });

  // percent 객체 초기화
  const percent: Record<string, number> = {};
  Object.keys(typeNameMap).forEach((type) => {
    percent[type] = 0;
  });

  // 실제 퍼센트 계산
  countsByType.forEach(
    ({ type, _count }: { type: string; _count: { type: number } }) => {
      if (type in typeNameMap) {
        percent[type] =
          totalProfiles > 0
            ? Number(((_count.type / totalProfiles) * 100).toFixed(1))
            : 0;
      }
    }
  );

  // moonos 배열 생성
  const moonos = Object.keys(typeNameMap).map((type) => ({
    type: type as MemeType,
    label: typeNameMap[type],
    image: `${type.toLowerCase()}-moono`,
    percent: percent[type],
  }));

  // percent 기준으로 정렬 후 score 부여
  const rankedMoonos = [...moonos]
    .sort((a, b) => b.percent - a.percent)
    .map((moono, index) => ({
      ...moono,
      score: index + 1, // 1위부터 6위까지
    }));

  return NextResponse.json({
    participantCount,
    sharedCount,
    moonos: rankedMoonos,
  });
}
