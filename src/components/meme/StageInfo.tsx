import { Difficulty } from "@/types/question";

const difficultyMap: Record<Difficulty, string> = {
  low: "下",
  medium: "中",
  high: "上",
  bonus: "보너스",
};

export default function StageInfo({
  stageLabel, // ex: stage1
  stageName, // ex: SNS
  difficulty,
}: {
  stageLabel: string;
  stageName: string;
  difficulty: Difficulty;
}) {
  return (
    <div className="mb-1 text-center text-[17px] text-black">
      <p
        className={`font-medium ${
          difficulty === "bonus"
            ? "flex justify-center"
            : "flex justify-center gap-5"
        }`}>
        <span>{stageName}</span>
        {difficulty !== "bonus" && <span>{difficultyMap[difficulty]}</span>}
      </p>
    </div>
  );
}
