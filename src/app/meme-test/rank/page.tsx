"use client";

import { useGetTypeRankQuery } from "@/hooks/useGetTypeRankQuery";
import { useRouter } from "next/navigation";
import Header from "@/components/meme/Header";
import MoonoCard from "@/components/meme/MoonoCard";
import type { MemeType } from "@/store/memeTypeData";

export default function RankingPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetTypeRankQuery();

  const topMoonos = (data?.moonos ?? []).sort((a, b) => b.percent - a.percent);

  if (isLoading)
    return <div className="mt-10 text-center font-medium">로딩 중...</div>;
  if (isError || !data)
    return <div className="mt-10 text-center">데이터 불러오기 실패</div>;

  return (
    <div className="flex h-full w-full flex-col bg-pink-200 px-0">
      <Header onBack={() => router.back()} />

      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-10">
        {topMoonos.map((moono, index) => (
          <MoonoCard
            key={moono.type}
            type={moono.type as MemeType}
            label={moono.label}
            percent={moono.percent}
            image={moono.image}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
