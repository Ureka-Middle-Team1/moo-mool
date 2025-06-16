export default function EmptyRadarPlaceholder() {
  return (
    <div className="mx-auto flex max-w-xl items-center justify-center">
      <img
        src="/assets/banner/radar-blur.png"
        alt="빈 성향 레이더 차트"
        className="w-full max-w-md object-contain opacity-70"
      />
    </div>
  );
}
