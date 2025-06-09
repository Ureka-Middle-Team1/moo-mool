import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const answers = body.answers;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const STAGE_MAX_SCORE = 140; // low(20) + medium(30) + high(50) + bonus(40)
    const BONUS_SCORE_MAP: Record<string, number> = {
      c1: 10,
      c2: 20,
      c3: 30,
      c4: 40,
    };
    const DIFFICULTY_SCORE: Record<string, number> = {
      low: 20,
      medium: 30,
      high: 50,
    };

    type Answer = {
      stage: string;
      difficulty: string | null;
      isCorrect: boolean | null;
      selectedChoiceId: string;
    };

    const result: Record<
      string,
      {
        score: number;
        details: {
          [key: string]: number;
          low: number;
          medium: number;
          high: number;
          bonus: number;
        };
      }
    > = {};

    for (const answer of answers as Answer[]) {
      const { stage, difficulty, isCorrect, selectedChoiceId } = answer;

      if (!result[stage]) {
        result[stage] = {
          score: 0,
          details: { low: 0, medium: 0, high: 0, bonus: 0 },
        };
      }

      if (difficulty === "bonus") {
        const bonusScore = BONUS_SCORE_MAP[selectedChoiceId] || 0;
        result[stage].details.bonus = bonusScore;
        result[stage].score += bonusScore;
      } else {
        if (
          isCorrect === true &&
          difficulty !== null &&
          Object.prototype.hasOwnProperty.call(DIFFICULTY_SCORE, difficulty)
        ) {
          const score = DIFFICULTY_SCORE[difficulty];
          result[stage].details[difficulty] = score;
          result[stage].score += score;
        }
      }
    }

    // 백분율 계산
    for (const stage in result) {
      const rawScore = result[stage].score;
      result[stage].score =
        Math.round((rawScore / STAGE_MAX_SCORE) * 10000) / 100; // 소수점 둘째자리까지
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("POST /api/test/submit error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
