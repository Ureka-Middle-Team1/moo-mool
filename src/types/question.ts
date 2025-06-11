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

export type QuestionsResponse = {
  success: boolean;
  questions: {
    [stage: string]: {
      [difficulty in Difficulty]: Question;
    };
  };
};
