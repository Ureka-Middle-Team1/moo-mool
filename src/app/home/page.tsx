import EmptyRadarPlaceholder from "@/components/home/EmptyRadarPlaceholder";
import HomeHeader from "@/components/home/HomeHeader";
import PopularPlansList from "@/components/home/PopularPlansList";

export default function HomePage() {
  const isTested = true; // 테스트 완료 여부

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <HomeHeader />

      {isTested ? <div>hi</div> : <EmptyRadarPlaceholder />}

      <PopularPlansList />
    </div>
  );
}
