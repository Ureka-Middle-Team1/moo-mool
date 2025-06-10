import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const STAGES = ["SNS", "Youtube", "Chat", "Calling", "Books", "Saving"];
const DIFFICULTIES = ["low", "medium", "high"];

// 랜덤 하나 고르는 함수
function getRandomOne<T>(items: T[]): T | null {
  if (!items.length) return null;
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export async function GET() {
  try {
    const questions: Record<string, Record<string, any | null>> = {};

    for (const stage of STAGES) {
      questions[stage] = {};

      // 난이도별 질문 가져오기
      for (const difficulty of DIFFICULTIES) {
        const all = await prisma.typeQuestion.findMany({
          where: { stage, difficulty },
        });
        questions[stage][difficulty] = getRandomOne(all);
      }

      // 보너스 질문 가져오기
      const bonuses = await prisma.typeQuestion.findMany({
        where: { stage, difficulty: "bonus" },
      });
      questions[stage]["bonus"] = getRandomOne(bonuses);
    }

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
