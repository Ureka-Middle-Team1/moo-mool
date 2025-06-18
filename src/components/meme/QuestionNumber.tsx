import Image from "next/image";
import { Difficulty } from "@/types/question";

export default function QuestionNumber({
  difficulty,
  stage,
  questionNumber,
}: {
  difficulty: Difficulty;
  stage: string;
  questionNumber: number | null;
}) {
  return (
    <div className="items-left mb-5 ml-[30px] flex flex-col justify-center">
      {difficulty === "bonus" ? (
        <Image
          src={`/assets/moono/${stage.toLowerCase()}-moono.png`}
          alt="보너스 아이콘"
          width={60}
          height={40}
          className="object-contain"
        />
      ) : (
        <h2 className="text-5xl font-bold">Q{questionNumber}</h2>
      )}
      <div className="mt-1 h-[2px] w-16 bg-pink-400" />
      <div className="mt-[2px] h-[2px] w-16 bg-pink-400" />
    </div>
  );
}
