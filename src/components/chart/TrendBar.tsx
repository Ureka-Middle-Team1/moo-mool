interface TrendBarProps {
  label: string;
  value: number; // 0 ~ 100 (%)
}

export default function TrendBar({ label, value }: TrendBarProps) {
  return (
    <div className="flex w-full items-center gap-2">
      {/* 왼쪽 레이블 - 왼쪽 정렬 */}
      <span className="w-[20%] text-left text-sm font-medium text-gray-700">
        {label}
      </span>

      {/* 배경 바 */}
      <div className="relative h-2 w-[80%] overflow-hidden rounded-full bg-gray-300">
        {/* 노란 바 */}
        <div
          className="h-full rounded-r-full bg-yellow-300 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
