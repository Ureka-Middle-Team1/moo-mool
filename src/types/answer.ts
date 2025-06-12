import { Difficulty } from "./question";

export type Answer = {
  questionId: number;
  selectedChoiceId: string;
  isCorrect: boolean | null;
  stage: string;
  difficulty: Difficulty;
  isBonus: boolean;
};
