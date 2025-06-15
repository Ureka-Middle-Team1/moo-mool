import { Difficulty } from "@/types/question";

const difficultyMap: Record<Difficulty, string> = {
  low: "下",
  medium: "中",
  high: "上",
  bonus: "보너스",
};

export default function StageInfo({
  stage,
  difficulty,
}: {
  stage: string;
  difficulty: Difficulty;
}) {
  return (
    <div className="mb-4 text-center text-[17px] text-black">
      <p
        className={`font-medium ${
          difficulty === "bonus"
            ? "flex justify-center"
            : "flex justify-center gap-5"
        }`}>
        <span>
          {stage} - {stage}
        </span>
        {difficulty !== "bonus" && (
          <span>난이도 {difficultyMap[difficulty]}</span>
        )}
      </p>
    </div>
  );
}
