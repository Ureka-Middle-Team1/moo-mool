import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topPlans = await prisma.user.groupBy({
      by: ["recommended_plan"],
      _count: true,
      where: {
        recommended_plan: {
          not: null,
        },
      },
      orderBy: {
        _count: {
          recommended_plan: "desc",
        },
      },
      take: 3,
    });

    const planIds = topPlans.map((item) => item.recommended_plan);

    const plans = await prisma.plan.findMany({
      where: {
        id: {
          in: planIds as number[],
        },
      },
    });

    // 추천 수와 함께 join
    const enriched = plans.map((plan) => ({
      ...plan,
      recommend_count:
        topPlans.find((p) => p.recommended_plan === plan.id)?._count ?? 0,
    }));

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("Error fetching top recommended plans:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
