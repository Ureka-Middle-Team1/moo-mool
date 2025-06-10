import { Plan } from "@/hooks/useGetRecommendedPlanQuery";

export default function PlanCard({ rank, title, subtitle, detail }: Plan) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-pink-400 bg-white p-3">
      {/* 순위: 동그란 핑크 배지 */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400 text-lg font-semibold text-white">
        {rank}위
      </div>

      {/* 텍스트: 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-1 font-bold text-black">
        <p className="underline-pink-bg text-xl underline-offset-4">{title}</p>
        <p className="text-lg">{subtitle}</p>
        <p className="text-sm font-light">{detail}</p>
      </div>
    </div>
  );
}
