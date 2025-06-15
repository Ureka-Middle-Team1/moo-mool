import { create } from "zustand";

type Answer = {
  questionId: number;
  selectedChoiceId: string;
  isCorrect: boolean | null;
  stage: string; // "SNS" | "Youtube" | ...
  difficulty: "low" | "medium" | "high" | "bonus";
  isBonus: boolean;
};

type QuestionStore = {
  answers: Answer[];
  setAnswer: (answer: Answer) => void;
  resetAnswers: () => void;
};

export const useQuestionStore = create<QuestionStore>((set) => ({
  answers: [],
  setAnswer: (newAnswer) =>
    set((state) => {
      const updated = state.answers.filter(
        (a) => a.questionId !== newAnswer.questionId
      );
      return { answers: [...updated, newAnswer] };
    }),
  resetAnswers: () => set({ answers: [] }),
}));
