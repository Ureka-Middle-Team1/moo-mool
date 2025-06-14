"use client";

import { ChevronLeft } from "lucide-react";
import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { useRouter } from "next/navigation";

export default function TestHomePage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTypeRankQuery();
  if (isLoading)
    return <div className="mt-10 text-center font-medium">로딩 중...</div>;
  if (isError || !data)
    return <div className="mt-10 text-center">데이터 불러오기 실패</div>;

  const topMoonos = (data?.moonos ?? [])
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
  const handleClick = () => {
    router.back(); //바로 이전 페이지로 이동하기
  };
  return (
    <div className="flex h-full w-full flex-1 flex-col bg-pink-200 px-0">
      <header className="sticky top-0 z-100 flex h-12 w-full items-center justify-between bg-yellow-200 px-4 font-bold">
        <div className="flex items-center">
          <ChevronLeft onClick={handleClick} className="h-5 w-5" />
        </div>
        <div className="flex-1 text-center">콘텐츠 과몰입 테스트</div>
        <div className="h-5 w-5" />
      </header>
      <div className="mb-8 flex w-[90%] flex-col gap-4 rounded-[10px] bg-white p-4 shadow-md">
        {topMoonos.map((moono, index) => (
          <div key={index} className="flex w-full">
            <div className="flex w-1/2 items-center justify-between">
              <div className="mr-2 h-6 w-1 bg-pink-400"></div>
              <span className="text-sm font-bold text-black">
                {index + 1}등
              </span>
              <img
                src={`/assets/moono/${moono.image}.png`}
                alt={moono.label}
                className="ml-3 h-12 w-12"
              />
            </div>
            <div className="flex w-1/2 items-center justify-center pr-3">
              <p className="text-sm font-medium text-black">{moono.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
