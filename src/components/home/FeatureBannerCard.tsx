type FeatureBannerCardProps = {
  subtitle: string;
  title: string;
  description: string;
  image: string; // e.g. "/assets/banner/advice.png"
};

export default function FeatureBannerCard({
  subtitle,
  title,
  description,
  image,
}: FeatureBannerCardProps) {
  return (
    <div className="w-full">
      <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#E0FFE8] via-[#F0FAFF] to-[#FFFCEB] px-5 py-5 shadow-md sm:flex-row sm:items-center">
        {/* 텍스트 영역 */}
        <div className="z-10 max-w-[60%]">
          <p className="text-xs text-gray-600">{subtitle}</p>
          <h2 className="my-2 text-xl leading-tight font-bold whitespace-pre-line text-gray-800">
            {title}
          </h2>
          <p className="text-xs text-gray-600">{description}</p>
        </div>

        {/* 이미지 영역 */}
        <div className="absolute right-4 bottom-0 w-24 sm:static sm:w-32">
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
