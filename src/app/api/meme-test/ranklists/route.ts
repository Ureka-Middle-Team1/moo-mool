import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const typeNameMap: Record<string, string> = {
  SNS: "인싸 무너",
  Youtube: "팝콘 무너",
  Chat: "투머치톡커 무너",
  Calling: "여보세무너",
  Books: "꼬꼬무너",
  Saving: "꽁돈 무너",
};

export async function GET() {
  // 1. participantCount, shareCount 구하기
  const userAggregates = await prisma.user.aggregate({
    _sum: {
      tested_count: true,
      invited_count: true,
    },
  });

  const participantCount = userAggregates._sum.tested_count || 0;
  const shareCount = userAggregates._sum.invited_count || 0;

  // 2. UserCharacterProfile 타입별 개수 구하기
  const totalProfiles = await prisma.UserCharacterProfile.count();

  // 3. 타입별 개수 그룹핑
  const countsByType = await prisma.UserCharacterProfile.groupBy({
    by: ["type"],
    _count: {
      type: true,
    },
  });

  // 4. moonos 배열 만들기
  const moonos = countsByType.map(({ type, _count }) => {
    const score =
      totalProfiles > 0 ? Math.round((_count.type / totalProfiles) * 100) : 0;
    return {
      label: typeNameMap[type] || type,
      image: `${type.toLowerCase()}-moono`,
      score,
    };
  });

  return NextResponse.json({
    participantCount,
    shareCount,
    moonos,
  });
}
