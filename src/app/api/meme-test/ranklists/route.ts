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
  const userAggregates = await prisma.user.aggregate({
    _sum: {
      tested_count: true,
      invited_count: true,
    },
  });

  const participantCount = userAggregates._sum.tested_count || 0;
  const shareCount = userAggregates._sum.invited_count || 0;

  const totalProfiles = await prisma.userCharacterProfile.count();

  const countsByType = await prisma.userCharacterProfile.groupBy({
    by: ["type"],
    _count: {
      type: true,
    },
  });

  const moonos = Object.keys(typeNameMap).map((type) => ({
    label: typeNameMap[type],
    image: `${type}-moono`,
  }));

  // percent 객체 초기화: 모든 타입 0으로 시작
  const percent: Record<string, number> = {};
  Object.keys(typeNameMap).forEach((type) => {
    percent[type] = 0;
  });

  // 실제 데이터가 있으면 덮어쓰기
  countsByType.forEach(({ type, _count }) => {
    if (type in typeNameMap) {
      percent[type] =
        totalProfiles > 0
          ? Number(((_count.type / totalProfiles) * 100).toFixed(1))
          : 0;
    }
  });

  return NextResponse.json({
    participantCount,
    shareCount,
    moonos,
    percent,
  });
}
