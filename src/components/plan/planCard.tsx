interface PlanCardProps {
  rank: number;
  title: string;
  subtitle: string;
  detail: string;
}

export default function PlanCard({
  rank,
  title,
  subtitle,
  detail,
}: PlanCardProps) {
  return (
    <div className="flex w-full items-center gap-4 rounded-2xl border-1 border-pink-500 bg-white p-3">
      {/* 순위 */}
      <div className="flex items-center justify-center rounded-full bg-pink-400 p-5 text-xl font-bold text-white">
        {rank}위
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col">
        <p className="font-bold text-black underline decoration-pink-400 decoration-4 underline-offset-4">
          {title}
        </p>
        <p className="text-sm font-bold text-black">{subtitle}</p>
        <p className="text-sm font-light text-black">{detail}</p>
      </div>
    </div>
  );
}
