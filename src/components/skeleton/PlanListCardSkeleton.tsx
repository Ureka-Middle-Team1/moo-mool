export default function PlanListCardSkeleton() {
  return (
    <div className="w-full max-w-xs animate-pulse rounded-2xl bg-white p-4 shadow-md">
      {/* 헤더 */}
      <div className="mb-1 flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-gray-300" />
        <div className="h-4 w-16 rounded bg-gray-300" />
      </div>

      {/* 제목 */}
      <div className="mb-2 h-5 w-2/3 rounded bg-gray-300" />

      {/* 배지 */}
      <div className="mb-3 flex gap-2 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 w-16 rounded-full bg-gray-200" />
        ))}
      </div>

      {/* OTT 아이콘 */}
      <div className="flex items-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-full border-2 border-white bg-gray-300 ${
              i !== 0 ? "-ml-3" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
