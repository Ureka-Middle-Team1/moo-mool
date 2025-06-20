"use client";

import PlanListCard from "../planList/PlanListCard";
import { useGetTopRecommendedPlans } from "@/hooks/useGetTopRecommendedPlans";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PlanListCardSkeleton from "../skeleton/PlanListCardSkeleton";

export default function PopularPlansList() {
  const { data, isLoading, isError } = useGetTopRecommendedPlans();

  if (isLoading) {
    // Skeleton을 보여주기 위한 처리
    return (
      <section className="flex w-full flex-col items-center px-4">
        <Carousel className="relative mx-auto w-full max-w-md">
          <CarouselContent className="-ml-4 px-5 py-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <CarouselItem
                key={idx}
                className="flex basis-[95%] justify-center pl-4">
                <PlanListCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  // ✅ 로딩이 아닌 경우만 에러 여부 확인
  if (isError || !data) {
    return <p>추천 요금제를 불러올 수 없습니다.</p>;
  }

  return (
    <section className="flex w-full flex-col items-center px-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="-ml-4 px-5 py-5">
          {data.map((plan, idx) => (
            <CarouselItem key={plan.id} className="flex justify-center pl-4">
              <PlanListCard plan={plan} hideBenefits={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
