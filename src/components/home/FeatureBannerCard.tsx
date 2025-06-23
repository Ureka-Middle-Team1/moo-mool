type FeatureBannerCardProps = {
  title: string;
  description: string;
  image: string; // e.g. "/assets/banner/advice.png"
};

export default function FeatureBannerCard({
  title,
  description,
  image,
}: FeatureBannerCardProps) {
  return (
    <div className="mx-2 h-full w-full">
      <div className="relative flex w-[95%] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFE4EC] via-[#FFF0DB] to-[#FFF9EB] px-8 py-8 shadow-md sm:flex-row sm:items-center">
        {/* 텍스트 영역 */}
        <div className="z-10 max-w-[63%]">
          <h2 className="mb-2 text-lg leading-tight font-bold whitespace-pre-line text-gray-900 md:text-xl">
            {title}
          </h2>
          <p className="text-xs text-gray-700 md:text-sm">{description}</p>
        </div>

        {/* 이미지 영역 */}
        <div className="absolute right-5 bottom-6 w-23 sm:static md:right-7">
          <img
            src={image}
            alt="기능 이미지"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
