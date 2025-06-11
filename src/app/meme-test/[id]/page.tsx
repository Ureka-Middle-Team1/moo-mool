"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionStore } from "@/store/questionStore";
import { useSubmitAnswers } from "@/hooks/useSubmitAnswers";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import {
  Answer,
  Choice,
  Difficulty,
  Question,
  QuestionsResponse,
} from "@/types/question";

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
  const answers = useQuestionStore((state) => state.answers);
  const { mutate: submitAnswers } = useSubmitAnswers();
  const { data, isLoading, error } = useGetQuestions();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (data?.success) {
      const flat = flattenQuestions(data.questions as any).map((q) => ({
        ...q,
        choices:
          typeof q.choices === "string"
            ? (JSON.parse(q.choices) as Choice[])
            : q.choices,
      }));
      setQuestions(flat);
    }
  }, [data]);

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
      submitAnswers({
        userId: "cmbr9fdrc0000qussh91xmo29",
        planId: 1,
        answers,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>문제를 불러오는 중 오류 발생</p>;
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
        {(typeof question.choices === "string"
          ? JSON.parse(question.choices)
          : question.choices
        ).map((choice: Choice) => (
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
