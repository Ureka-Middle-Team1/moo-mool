import EmptyRadarPlaceholder from "@/components/home/EmptyRadarPlaceholder";
import HomeHeader from "@/components/home/HomeHeader";
import PopularPlansList from "@/components/home/PopularPlansList";
import TopGradient from "@/components/planDetail/TopGradient";

export default function HomePage() {
  const isTested = true; // 테스트 완료 여부

  return (
    <div className="flex flex-col items-center">
      <TopGradient />
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <HomeHeader />
        {isTested ? <div>hi</div> : <EmptyRadarPlaceholder />}
        <PopularPlansList />
      </section>
    </div>
  );
}
