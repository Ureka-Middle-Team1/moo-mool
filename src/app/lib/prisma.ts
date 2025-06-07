import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// 전역 환경에 PrismaClient를 재사용하게 해서 dev 환경에서 hot-reload 문제 방지
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
