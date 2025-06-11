"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionStore } from "@/store/questionStore";

type Choice = {
  id: string;
  text: string;
  isCorrect?: boolean;
};

type Difficulty = "low" | "medium" | "high" | "bonus";

type Question = {
  id: number;
  stage: string;
  difficulty: Difficulty;
  is_bonus: boolean | number;
  question_text: string;
  example_type: string | null;
  example_content: string | null;
  choices: Choice[];
};

type Answer = {
  questionId: number;
  selectedChoiceId: string;
  isCorrect: boolean | null;
  stage: string;
  difficulty: Difficulty;
  isBonus: boolean;
};

type QuestionsResponse = {
  success: boolean;
  questions: {
    [stage: string]: {
      [difficulty in Difficulty]: Question;
    };
  };
};
const difficultyNumberMap: Record<Difficulty, number | null> = {
  low: 1,
  medium: 2,
  high: 3,
  bonus: null,
};
const stageMap: Record<string, string> = {
  SNS: "stage1",
  Youtube: "stage2",
  Chat: "stage3",
  Calling: "stage4",
  Books: "stage5",
  Saving: "stage6",
};

const difficultyMap: Record<Difficulty, string> = {
  low: "下",
  medium: "中",
  high: "上",
  bonus: "보너스",
};
const getStageNumber = (stage: string) => {
  // stageMap 값이 "stage1", "stage2" 이런 형식이면 뒤 숫자를 파싱
  const match = stage.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1; // 기본 1
};
export default function TestQuestionPage() {
  const setAnswer = useQuestionStore((state) => state.setAnswer);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const flattenQuestions = (questionsObj: QuestionsResponse["questions"]) => {
    const arr: Question[] = [];
    for (const stage of Object.keys(questionsObj)) {
      for (const difficulty of Object.keys(
        questionsObj[stage]
      ) as Difficulty[]) {
        const q = questionsObj[stage][difficulty];
        if (q) arr.push(q);
      }
    }
    return arr;
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/test/questions");
        const data: QuestionsResponse = await res.json();

        if (data.success) {
          // 객체를 배열로 바꾸고 choices JSON 문자열 -> 배열로 변환
          const arr = flattenQuestions(data.questions).map((q) => ({
            ...q,
            choices: JSON.parse(q.choices as unknown as string),
          }));
          if (arr.length === 0) {
            setError("문제가 없습니다.");
          } else {
            setQuestions(arr);
          }
        } else {
          setError("문제를 불러오지 못했습니다.");
        }
      } catch {
        setError("네트워크 오류");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const onSubmit = async () => {
    const answers = useQuestionStore.getState().answers;

    // 💡 answers에서 각 스테이지별 최고 난이도 계산
    const getMaxLevel = (stage: string) => {
      const levels = answers
        .filter((a) => a.stage === stage && a.difficulty !== "bonus")
        .map((a) => {
          if (a.difficulty === "low") return 1;
          if (a.difficulty === "medium") return 2;
          if (a.difficulty === "high") return 3;
          return 0;
        });
      return levels.length ? Math.max(...levels) : 0;
    };

    const payload = {
      userId: "cmbr9fdrc0000qussh91xmo29",
      planId: 1,
      call_level: getMaxLevel("Calling"),
      sms_level: getMaxLevel("Chat"),
      sns_level: getMaxLevel("SNS"),
      youtube_level: getMaxLevel("Youtube"),
      book_level: getMaxLevel("Books"),
      saving_level: getMaxLevel("Saving"),
      type: "Youtube",
      answers,
    };

    const res = await fetch("/api/test/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log("DB 저장 결과:", result);
  };

  const handleChoiceClick = (choice: Choice) => {
    const question = questions[currentIndex];
    if (!question) return;

    const answer: Answer = {
      questionId: question.id,
      selectedChoiceId: choice.id,
      isCorrect: choice.isCorrect ?? null,
      stage: question.stage,
      difficulty: question.difficulty,
      isBonus: Boolean(question.is_bonus),
    };

    setAnswer(answer);

    if (currentIndex === questions.length - 1) {
      onSubmit(); // 마지막 문제면 제출
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;
  if (questions.length === 0) return <p>문제가 없습니다.</p>;

  const question = questions[currentIndex];

  // 문제 번호 계산
  let questionNumber: number | null = null;
  if (question) {
    const stageNum = getStageNumber(stageMap[question.stage] || question.stage);
    const diffNum = difficultyNumberMap[question.difficulty];
    if (diffNum !== null) {
      // (stageNum - 1) * 3 + diffNum
      questionNumber = (stageNum - 1) * 3 + diffNum;
    } else {
      // 보너스 문제는 번호 없음
      questionNumber = null;
    }
  }
  return (
    <div className="min-h-screen bg-pink-100 px-4 py-6">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-2 rounded-md bg-yellow-200 px-4 py-2">
        <button className="text-lg font-semibold">x</button>
        <h1 className="flex-1 text-center text-sm font-semibold">
          콘텐츠 과몰입 테스트
        </h1>
      </div>

      {/* 스테이지 정보 */}
      <div className="mb-4 text-center text-sm text-gray-700">
        <p className="flex justify-center gap-5 font-medium">
          <span>
            {stageMap[question.stage] || question.stage} - {question.stage}
          </span>
          <span>
            난이도 {difficultyMap[question.difficulty] || question.difficulty}
          </span>
        </p>
      </div>

      {/* 문제 번호 */}
      <div className="mb-2 flex justify-center">
        {questionNumber !== null ? (
          <h2 className="text-2xl font-bold text-pink-800">
            Q{questionNumber}
          </h2>
        ) : (
          <Image src="/icons/bonus-icon.png" alt="" width={15} height={15} />
        )}
      </div>

      {/* 문제 설명 */}
      <p className="mb-4 text-center text-base text-gray-800">
        {question.question_text}
      </p>

      {/* 예시 이미지 또는 텍스트 */}
      {question.example_type === "image" && question.example_content ? (
        <div className="mb-6 flex justify-center">
          <Card className="border-2 border-pink-300 p-2">
            <CardContent className="flex items-center justify-center p-0">
              <Image
                src={question.example_content}
                alt="예시 구역"
                width={160}
                height={160}
                className="object-contain"
              />
            </CardContent>
          </Card>
        </div>
      ) : question.example_type === "text" && question.example_content ? (
        <p className="mb-6 rounded border border-pink-300 bg-white p-4 text-center text-pink-700">
          {question.example_content}
        </p>
      ) : null}

      {/* 선택지 */}
      <div className="mx-auto flex max-w-xs flex-col gap-3">
        {question.choices.map((choice) => (
          <Button
            key={choice.id}
            variant="outline"
            className="rounded-full border-2 border-pink-300 bg-white text-pink-800 hover:bg-pink-200"
            onClick={() => handleChoiceClick(choice)}>
            {choice.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
