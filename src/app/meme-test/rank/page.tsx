"use client";

import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { useRouter } from "next/navigation";
import Header from "@/components/meme/Header";
import { memeTypeData } from "@/store/memeTypeData";
import type { MemeType } from "@/store/memeTypeData";

export default function RankingPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTypeRankQuery();

  const topMoonos = (data?.moonos ?? []).sort((a, b) => b.percent - a.percent);
  console.log("Top Moonos:", topMoonos);

  return (
    <div className="flex h-full w-full flex-col bg-pink-200 px-0">
      <Header onBack={() => router.back()} />

      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-10">
        {topMoonos.map((moono, index) => {
          const meta = memeTypeData[moono.type as MemeType];

          return (
            <div
              key={moono.type}
              className="relative flex h-[105px] w-[95%] items-center gap-2 rounded-xl border-1 border-pink-400 bg-white px-4 py-3">
              {/* 좌측: 설명 + 태그 */}
              <div className="flex flex-1 flex-row items-center gap-4">
                {/* 순위 + 이름 */}
                <div className="relative inline-block text-[40px] leading-none font-extrabold">
                  <span className="pointer-events-none absolute top-1 left-1 text-pink-400 select-none">
                    {index + 1}
                  </span>
                  <span className="relative text-black">{index + 1}</span>
                </div>
                <div className="flex flex-col justify-center pr-16">
                  {" "}
                  {/* padding-right으로 이미지 겹칠 공간 확보 (고정위치) */}
                  <span className="mb-[3px] text-2xl font-bold">
                    {moono.label}
                  </span>
                  <p className="mb-1 text-sm text-black">
                    {meta.shortDescription}
                  </p>
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
                  <span className="font-bold">{moono.percent}%</span> 가 이
                  유형입니다.
                </div>
                <img
                  src={`/assets/moono/${moono.image}.png`}
                  alt={moono.label}
                  className="h-16 w-16 object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
