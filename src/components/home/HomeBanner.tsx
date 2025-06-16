export default function HomeBanner() {
  return (
    <div className="w-full space-y-4">
      {/* 하단 배너 이미지 */}
      <div className="h-45 w-full overflow-hidden rounded-2xl bg-[#FFE0E0] shadow-lg">
        <img
          src="/assets/banner/test-again.png"
          alt="콘텐츠 유형 테스트 배너"
          className="h-45 w-full object-contain"
        />
      </div>
    </div>
  );
}
