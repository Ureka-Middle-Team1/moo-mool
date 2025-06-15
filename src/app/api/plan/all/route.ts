import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { id: "asc" },
    });

    const parsed = plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      dataAmountMb: plan.dataAmountMb,
      overageSpeedMbps: plan.overageSpeedMbps,
      voiceMinutes: plan.voiceMinutes,
      smsIncluded: plan.smsIncluded,
      networkType: plan.networkType,
      subscriptionServices: Array.isArray(plan.subscriptionServices)
        ? plan.subscriptionServices
        : [],
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("[PLAN_ALL_GET_ERROR]", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
