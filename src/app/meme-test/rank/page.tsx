"use client";

import { ChevronLeft, X } from "lucide-react";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { useRouter } from "next/navigation";
import Image from "next/image";

// 💡 각 type별 설명과 해시태그 추가
const moonoMeta: Record<string, { description: string; tags: string[] }> = {
  SNS: {
    description: '"좋아요 놀러줘~💓 필터는 진심이야!"',
    tags: ["#오늘도_셀카한장", "#팔로우미플리즈", "#인스타중독러"],
  },
  Youtube: {
    description: '"오늘도 넷플릭스와 유튜브가 날 부른다!"',
    tags: ["#정주행은_못참지", "#하루종일_재생중", "#팝콘들고_출발"],
  },
  Chat: {
    description: '"전화는 부담스러워... 톡은 언제든 환영!"',
    tags: ["#카톡속도가빛의속도", "#문자한줄로끝내기", "#채팅마스터"],
  },
  Calling: {
    description: '"톡 말고 전화해! 목소리가 국룰이야~"',
    tags: ["#수다요정_등장", "#전화가_먼저야", "#하루통화5시간"],
  },
  Books: {
    description: '"모르는 건 못 참아~ 바로 검색 각!"',
    tags: ["#호기심천국", "#지식이최고의무기", "#검색은내운명"],
  },
  Saving: {
    description: '"쓸 땐 쓰더라고, 아낄 땐 확실하게!"',
    tags: ["#1원까지_관리함", "#가계부요정", "#알뜰살뜰짠돌이"],
  },
};

export default function RankingPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTypeRankQuery();

  if (isLoading)
    return <div className="mt-10 text-center font-medium">로딩 중...</div>;
  if (isError || !data)
    return <div className="mt-10 text-center">데이터 불러오기 실패</div>;

  const topMoonos = (data?.moonos ?? []).sort((a, b) => b.percent - a.percent);
  console.log("Top Moonos:", topMoonos);
  const handleClick = () => {
    router.back();
  };

  return (
    <div className="flex w-full flex-col bg-pink-200 px-0">
      <header className="sticky top-0 z-100 mb-[5px] flex h-12 w-full items-center justify-between bg-yellow-200 px-4">
        <div className="flex items-center">
          <ChevronLeft onClick={handleClick} className="h-5 w-5" />
        </div>
        <div
          style={{ fontFamily: "kkubulim" }}
          className="font-nomal flex flex-1 items-center justify-center space-x-1">
          <span>콘텐츠 과몰입 테스트</span>
          <X className="h-3 w-3" />
          <Image
            src="/assets/icons/U_plus.png"
            alt="U+ 로고"
            width={20}
            height={16}
            className="object-contain"
          />
        </div>
        <div className="h-5 w-5" />
      </header>

      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-10">
        {topMoonos.map((moono, index) => {
          const meta = moonoMeta[moono.type];

          return (
            <div
              key={index}
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
                  <p className="mb-1 text-sm text-black">{meta.description}</p>
                  <div className="flex gap-1 text-[11px] font-semibold whitespace-nowrap text-pink-400">
                    {meta.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
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
