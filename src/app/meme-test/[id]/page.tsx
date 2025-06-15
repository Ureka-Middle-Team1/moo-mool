"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
import { encrypt } from "@/utils/crypto";

import Header from "@/components/meme/Header";
import ProgressBar from "@/components/meme/ProgressBar";
import StageInfo from "@/components/meme/StageInfo";
import QuestionNumber from "@/components/meme/QuestionNumber";
import QuestionExample from "@/components/meme/QuestionExample";
import ChoiceList from "@/components/meme/ChoiceList";

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

const getStageNumber = (stage: string) => {
  const match = stage.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
};

export default function TestQuestionPage() {
  const router = useRouter();
  const setAnswer = useQuestionStore((state) => state.setAnswer);
  const answers = useQuestionStore((state) => state.answers);
  const { mutate: submitAnswers } = useSubmitAnswers();
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
      router.push(`/meme-test/result/${encrypted}`);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => router.push("/meme-test");

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>문제를 불러오는 중 오류 발생</p>;
  if (questions.length === 0) return <p>문제가 없습니다.</p>;

  const question = questions[currentIndex];
  const stageNum = getStageNumber(stageMap[question.stage] || question.stage);
  const diffNum = difficultyNumberMap[question.difficulty];
  const questionNumber = diffNum !== null ? (stageNum - 1) * 3 + diffNum : null;

  return (
    <div className="min-h-screen bg-pink-200">
      <Header onBack={handleBack} />
      <ProgressBar currentIndex={currentIndex} total={questions.length} />
      <StageInfo stage={question.stage} difficulty={question.difficulty} />
      <QuestionNumber
        difficulty={question.difficulty}
        stage={question.stage}
        questionNumber={questionNumber}
      />
      <p className="mb-10 text-center text-[17px]">{question.question_text}</p>
      <QuestionExample
        type={
          question.example_type === "image" || question.example_type === "text"
            ? question.example_type
            : null
        }
        content={question.example_content}
      />
      <ChoiceList
        choices={question.choices as Choice[]}
        onSelect={handleChoiceClick}
      />
    </div>
  );
}
