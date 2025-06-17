import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers = body.answers;
    const userId = body.userId;
    const planId = body.planId;

    if (!answers || !Array.isArray(answers) || !userId || !planId) {
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

    const SPECIAL_STAGE_SET = new Set(["Calling", "Chat", "Saving"]);

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

      const isSpecialStage = SPECIAL_STAGE_SET.has(stage);

      if (isSpecialStage) {
        const bonusScore = BONUS_SCORE_MAP[selectedChoiceId] || 0;
        result[stage].details.bonus += bonusScore;
        result[stage].score += bonusScore;
      } else {
        if (difficulty === "bonus") {
          const bonusScore = BONUS_SCORE_MAP[selectedChoiceId] || 0;
          result[stage].details.bonus += bonusScore;
          result[stage].score += bonusScore;
        } else if (
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

    // 동점일 경우의 타입 지정 우선순위 (데이터 많이 쓰는 순 정렬)
    const priority = ["Youtube", "SNS", "Calling", "Chat", "Books", "Saving"];

    // 최고 점수와 모든 점수 10 이하 여부 확인
    let maxScore = -1;
    let allScoresLow = true; // 모든 점수가 10 이하인지 체크

    for (const stage in result) {
      if (result[stage].score > maxScore) {
        maxScore = result[stage].score;
      }
      if (result[stage].score > 10) {
        allScoresLow = false;
      }
    }

    let topStages = [];

    if (allScoresLow) {
      // 모든 점수가 10 이하이면 무조건 Saving 선택
      topStages = ["Saving"];
    } else if (maxScore > 0) {
      // 최고 점수와 같은 점수를 가진 스테이지들
      for (const stage in result) {
        if (result[stage].score === maxScore) {
          topStages.push(stage);
        }
      }
    } else {
      // 점수가 모두 0 이거나 의미없으면 Saving 선택
      topStages = ["Saving"];
    }

    // 우선순위에 맞게 정렬 후 첫 번째 선택
    topStages.sort((a, b) => priority.indexOf(a) - priority.indexOf(b));
    const topStage = topStages[0];

    const getScore = (key: string) => result[key]?.score ?? 0;

    await prisma.userCharacterProfile.upsert({
      where: { user_id: userId },
      update: {
        plan_id: planId,
        call_level: getScore("Calling"),
        sms_level: getScore("Chat"),
        sns_level: getScore("SNS"),
        youtube_level: getScore("Youtube"),
        book_level: getScore("Books"),
        saving_level: getScore("Saving"),
        type: topStage,
      },
      create: {
        user_id: userId,
        plan_id: planId,
        call_level: getScore("Calling"),
        sms_level: getScore("Chat"),
        sns_level: getScore("SNS"),
        youtube_level: getScore("Youtube"),
        book_level: getScore("Books"),
        saving_level: getScore("Saving"),
        type: topStage,
      },
    });

    return NextResponse.json({ success: true, result, topStage });
  } catch (error) {
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
