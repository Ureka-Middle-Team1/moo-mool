"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import HomeRecommendedPlan from "@/components/home/HomeRecommendedPlan";
import PopularPlansList from "@/components/home/PopularPlansList";
import TopGradient from "@/components/planDetail/TopGradient";
import ChatHistoryList from "@/components/home/ChatHistoryList";
import FeatureBannerSlider from "@/components/home/FeatureBannerSlider";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-gray-50">
      <TopGradient />
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <Suspense fallback={<div>성향 불러오는 중...</div>}>
            <HomeHeader />
          </Suspense>
        </div>
        <div className="flex w-full flex-col gap-8 py-5">
          <FeatureBannerSlider />
          {/* Suspense로 감싸기 */}
          <div className="flex w-full flex-col">
            <h2 className="pl-4 text-lg font-semibold text-gray-900">
              최근 대화내역
            </h2>
            <ChatHistoryList />
          </div>
          <Suspense fallback={<div>추천 요금제 불러오는 중...</div>}>
            <HomeRecommendedPlan />
          </Suspense>
          <div className="flex w-full flex-col">
            <h2 className="pl-4 text-lg font-semibold text-gray-900">
              요즘 뜨는 요금제
            </h2>
            <PopularPlansList />
          </div>
        </div>
      </section>
    </div>
  );
}
