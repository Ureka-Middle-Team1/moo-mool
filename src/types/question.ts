export type Choice = {
  id: string;
  text: string;
  isCorrect?: boolean;
};

export type Difficulty = "low" | "medium" | "high" | "bonus";

export type Question = {
  id: number;
  stage: string;
  difficulty: Difficulty;
  is_bonus: boolean | number;
  question_text: string;
  example_type: string | null;
  example_content: string | null;
  choices: string | Choice[];
};

export type Answer = {
  questionId: number;
  selectedChoiceId: string;
  isCorrect: boolean | null;
  stage: string;
  difficulty: Difficulty;
  isBonus: boolean;
};

export type QuestionsResponse = {
  success: boolean;
  questions: {
    [stage: string]: {
      [difficulty in Difficulty]: Question;
    };
  };
};
