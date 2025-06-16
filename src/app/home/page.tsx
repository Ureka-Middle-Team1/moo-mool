"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import HomeBanner from "@/components/home/HomeBanner";
import HomeHeader from "@/components/home/HomeHeader";
import HomeRecommendedPlan from "@/components/home/HomeRecommendedPlan";
import PopularPlansList from "@/components/home/PopularPlansList";
import UserTendencyRadar from "@/components/home/UserTendencyRadar";
import TopGradient from "@/components/planDetail/TopGradient";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <TopGradient />
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <Suspense fallback={<div>성향 불러오는 중...</div>}>
          <HomeHeader />
        </Suspense>
        <div className="flex w-full flex-col gap-7 px-3 py-5">
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              홍길동님께 딱 맞는 요금제를 찾아볼까요?
            </h2>
            <HomeBanner />
          </div>

          <div className="flex w-full flex-col gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              나의 콘텐츠 성향
            </h2>
            {/*  Suspense로 감싸기 */}
            <Suspense fallback={<div>성향 분석 불러오는 중...</div>}>
              <UserTendencyRadar />
            </Suspense>
          </div>

          {/* Suspense로 감싸기 */}
          <Suspense fallback={<div>추천 요금제 불러오는 중...</div>}>
            <HomeRecommendedPlan />
          </Suspense>

          <div className="flex w-full flex-col">
            <h2 className="text-lg font-semibold text-zinc-900">
              요즘 뜨는 요금제
            </h2>
            <PopularPlansList />
          </div>
        </div>
      </section>
    </div>
  );
}
