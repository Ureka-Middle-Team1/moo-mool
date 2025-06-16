import PlanCard from "@/components/chat/PlanCard";
import EmptyRadarPlaceholder from "@/components/home/EmptyRadarPlaceholder";
import HomeBanner from "@/components/home/HomeBanner";
import HomeHeader from "@/components/home/HomeHeader";
import HomeRecommendedPlan from "@/components/home/HomeRecommendedPlan";
import PopularPlansList from "@/components/home/PopularPlansList";
import UserTendencyRadar from "@/components/home/UserTendencyRadar";
import TopGradient from "@/components/planDetail/TopGradient";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const isTested = true; // 테스트 완료 여부

  return (
    <div className="flex flex-col items-center">
      <TopGradient />
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <HomeHeader />
        <div className="flex w-full flex-col gap-7 px-3 py-5">
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              홍길동님께 딱 맞는 요금제를 찾아볼까요?
            </h2>
            <HomeBanner />
          </div>
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-zinc-900x text-lg font-semibold">
              나의 콘텐츠 성향
            </h2>
            {isTested ? <UserTendencyRadar /> : <EmptyRadarPlaceholder />}
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <h2 className="text-zinc-900x flex w-full text-lg font-semibold">
              나의 추천 요금제
            </h2>
            <HomeRecommendedPlan />
          </div>
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
