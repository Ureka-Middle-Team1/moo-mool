"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { useUpdateTestedCount } from "@/hooks/useUpdateTestedCount";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // 상태에 답변 저장
    setAnswer(answer);

    const isLastQuestion = currentIndex === questions.length - 1;

    if (isLastQuestion) {
      if (!session?.user?.id) {
        const callbackUrl = encodeURIComponent(pathname);
        router.push(`login?callbackUrl=${callbackUrl}`);
        return;
      }

      // 답변을 직접 배열에 최신으로 만듦 (zustand 상태가 아직 반영 안 됐을 수 있으므로 문제마다 답변을 모아서 제출)
      const newAnswers = [
        ...answers.filter((a) => a.questionId !== answer.questionId),
        answer,
      ];

      setIsSubmitting(true);

      const encrypted = encrypt(session.user.id);

      submitAnswers(
        {
          userId: session.user.id,
          planId: 1,
          answers: newAnswers,
        },
        {
          onSuccess: () => {
            // mutate(session.user.id);
            queryClient.invalidateQueries({ queryKey: ["getTypeRank"] });
            router.push(`/meme-test/result/${encrypted}`);
          },
          onError: (err) => {
            console.error("답안 제출 실패", err);
            alert("제출에 실패했습니다. 다시 시도해주세요.");
            setIsSubmitting(false);
          },
        }
      );
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
