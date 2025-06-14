"use client";

import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionStore } from "@/store/questionStore";
import { useSubmitAnswers } from "@/hooks/useSubmitAnswers";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import {
  Choice,
  Difficulty,
  Question,
  QuestionsResponse,
} from "@/types/question";
import { Answer } from "@/types/answer";
import { useRouter } from "next/navigation";
import { encrypt } from "@/utils/crypto";
import { useSession } from "next-auth/react";
import { useUpdateTestedCount } from "@/hooks/useUpdateTestedCount";

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
  const router = useRouter();
  const setAnswer = useQuestionStore((state) => state.setAnswer);
  const answers = useQuestionStore((state) => state.answers);
  const { mutate: submitAnswers } = useSubmitAnswers();
  const { mutate } = useUpdateTestedCount();
  const { data, isLoading, error } = useGetQuestions();
  const { data: session } = useSession();

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
  const handleClick = () => {
    router.push("/meme-test");
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
      console.log("세션 id ", session?.user.id);
      if (!session?.user?.id) {
        const callbackUrl = encodeURIComponent(window.location.href);
        router.push(`login?callbackUrl=${callbackUrl}`);
        return;
      }
      const encrypted = encrypt(session.user.id);
      submitAnswers({
        userId: session.user.id,
        planId: 1,
        answers,
      });
      mutate(session?.user.id);
      router.push(`/meme-test/result/${encrypted}`);
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
    <div className="h-[852px] bg-pink-200">
      {/* 헤더 */}
      <header className="sticky top-0 z-100 flex h-12 w-full items-center justify-between bg-yellow-200 px-4">
        <div className="flex items-center">
          <ChevronLeft onClick={handleClick} className="h-5 w-5" />
        </div>
        <div
          style={{ fontFamily: "kkubulim" }}
          className="font-nomal flex flex-1 items-center justify-center space-x-1">
          <span>콘텐츠 과몰입 테스트</span>
          <X className="h-3 w-3" />
          <Image
            src="/assets/icons/U_plus.png"
            alt="U+ 로고"
            width={20}
            height={16}
            className="object-contain"
          />
        </div>
        <div className="h-5 w-5" />
      </header>
      <div className="relative mb-10 h-2 w-full bg-white">
        <div
          className="absolute top-0 left-0 h-full bg-pink-400 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
      {/* 스테이지 정보 */}
      <div className="mb-4 text-center text-[17px] text-black">
        <p
          className={`font-medium ${
            question.difficulty === "bonus"
              ? "flex justify-center"
              : "flex justify-center gap-5"
          }`}>
          <span>
            {stageMap[question.stage] || question.stage} - {question.stage}
          </span>
          {question.difficulty !== "bonus" && (
            <span>
              난이도 {difficultyMap[question.difficulty] || question.difficulty}
            </span>
          )}
        </p>
      </div>

      {/* 문제 번호 or 보너스 아이콘 */}
      <div className="items-left mb-10 ml-[30px] flex flex-col justify-center">
        {question.difficulty === "bonus" ? (
          <Image
            src={`/assets/moono/${question.stage}-moono.png`}
            alt="보너스 아이콘"
            width={60}
            height={40}
            className="object-contain"
          />
        ) : (
          <h2 className="text-5xl font-bold">Q{questionNumber}</h2>
        )}
        {/* 밑줄 2개는 항상 보여줌 */}
        <div className="mt-1 h-[2px] w-16 bg-pink-400" />
        <div className="mt-[2px] h-[2px] w-16 bg-pink-400" />
      </div>

      {/* 문제 설명 */}
      <p className="mb-10 text-center text-[17px]">{question.question_text}</p>

      {/* 예시 이미지 또는 텍스트 */}
      {question.example_type === "image" && question.example_content ? (
        <div className="mb-6 flex justify-center">
          <Card className="border-1 border-pink-400 p-2">
            <CardContent className="flex items-center justify-center p-0">
              <Image
                src={question.example_content}
                alt="예시 구역"
                width={300}
                height={160}
                className="object-contain"
              />
            </CardContent>
          </Card>
        </div>
      ) : question.example_type === "text" && question.example_content ? (
        <p className="mb-6 rounded border border-pink-400 bg-white p-4 text-center text-pink-700">
          {question.example_content}
        </p>
      ) : null}

      {/* 선택지 */}
      <div className="item-center mx-auto flex max-w-xs flex-col gap-5">
        {(typeof question.choices === "string"
          ? JSON.parse(question.choices)
          : question.choices
        ).map((choice: Choice) => (
          <Button
            key={choice.id}
            variant="outline"
            className="h-[60px] w-[320px] rounded-full border-1 border-pink-400 bg-white font-[17px] hover:bg-pink-300"
            onClick={() => handleChoiceClick(choice)}>
            {choice.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
