import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 페이지 크기
const PAGE_SIZE = 5;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || `${PAGE_SIZE}`);
  const network = searchParams.get("network"); // "FIVE_G" | "LTE" | undefined
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "asc";
  const ottParam = searchParams.get("ott");
  const ottList = ottParam ? ottParam.split(",") : [];

  const baseWhere: any = {};
  if (network) {
    baseWhere.networkType = network;
  }

  const allPlans = await prisma.plan.findMany({
    where: baseWhere,
    orderBy: {
      [sort]: order === "asc" ? "asc" : "desc",
    },
  });

  const filteredPlans =
    ottList.length > 0
      ? allPlans.filter((plan) => {
          let services: string[] = [];

          if (Array.isArray(plan.subscriptionServices)) {
            services = plan.subscriptionServices as unknown as string[];
          } else if (typeof plan.subscriptionServices === "string") {
            try {
              services = JSON.parse(plan.subscriptionServices) as string[];
            } catch {
              services = [];
            }
          }

          return ottList.some((ott) => services.includes(ott));
        })
      : allPlans;

  const paginatedPlans = filteredPlans.slice(
    page * size,
    (page + 1) * size + 1
  );
  const hasNext = paginatedPlans.length > size;
  const sliced = hasNext ? paginatedPlans.slice(0, size) : paginatedPlans;

  if (process.env.NODE_ENV !== "production") {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return NextResponse.json({ data: sliced, hasNext });
}
