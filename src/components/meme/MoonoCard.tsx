import type { MemeType } from "@/store/memeTypeData";
import { memeTypeData } from "@/store/memeTypeData";

type MoonoCardProps = {
  type: MemeType;
  label: string;
  percent: number;
  image: string;
  rank: number;
};

export default function MoonoCard({
  type,
  label,
  percent,
  image,
  rank,
}: MoonoCardProps) {
  const meta = memeTypeData[type];

  return (
    <div
      className="relative flex h-[105px] w-[95%] items-center gap-2 rounded-xl border-1 border-pink-400 bg-white px-4 py-3"
      key={type}>
      {/* 좌측: 설명 + 태그 */}
      <div className="flex flex-1 flex-row items-center gap-4">
        {/* 순위 + 이름 */}
        <div className="relative inline-block text-[40px] leading-none font-extrabold">
          <span className="pointer-events-none absolute top-1 left-1 text-pink-400 select-none">
            {rank}
          </span>
          <span className="relative text-black">{rank}</span>
        </div>
        <div className="flex flex-col justify-center pr-16">
          <span className="mb-[3px] text-2xl font-bold">{label}</span>
          <p className="mb-1 text-sm text-black">{meta.shortDescription}</p>
          <div className="flex gap-1 text-[11px] whitespace-nowrap text-black">
            {meta.hashtagText.split(" ").map((tag, i) => (
              <span
                key={i}
                style={{ fontFamily: "kkubulim" }}
                className="relative z-10 inline-block">
                <span
                  className="absolute bottom-[0.2em] left-0 -z-10 h-[0.3em] w-full bg-pink-400"
                  aria-hidden="true"
                />
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 우측: 이미지 + 퍼센트 - absolute로 겹치게 */}
      <div className="absolute right-1 bottom-3 flex flex-col items-center justify-center">
        <div className="mb-1 rounded-full bg-yellow-200 px-2 py-[2px] text-[8px] whitespace-nowrap text-[#333] shadow-sm">
          <span className="font-bold">{percent}%</span> 가 이 유형입니다.
        </div>
        <img
          src={`/assets/moono/${image}.png`}
          alt={label}
          className="h-16 w-16 object-contain"
        />
      </div>
    </div>
  );
}
