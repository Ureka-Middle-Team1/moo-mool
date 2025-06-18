import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//페이지 크기
const PAGE_SIZE = 5;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || `${PAGE_SIZE}`);
  const network = searchParams.get("network") as "FIVE_G" | "LTE" | undefined;
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "asc";

  const where = network ? { networkType: network } : {};

  const plans = await prisma.plan.findMany({
    where,
    skip: page * size,
    take: size + 1,
    orderBy: {
      [sort]: order === "asc" ? "asc" : "desc",
    },
  });

  const hasNext = plans.length > size;
  const sliced = hasNext ? plans.slice(0, size) : plans;

  if (process.env.NODE_ENV !== "production") {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return NextResponse.json({ data: sliced, hasNext });
}
