export default function ProgressBar({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  const percentage = ((currentIndex + 1) / total) * 100;
  return (
    <div className="relative mb-10 h-2 w-full bg-white">
      <div
        className="absolute top-0 left-0 h-full bg-pink-400 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
