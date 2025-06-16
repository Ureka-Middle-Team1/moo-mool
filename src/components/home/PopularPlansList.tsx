"use client";

import PlanCard from "../chat/PlanCard";
import { useGetTopRecommendedPlans } from "@/hooks/useGetTopRecommendedPlans";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function PopularPlansList() {
  const { data, isLoading, isError } = useGetTopRecommendedPlans();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>추천 요금제를 불러올 수 없습니다.</p>;

  return (
    <section className="flex w-full flex-col items-center px-4">
      <Carousel className="relative mx-auto w-full max-w-md">
        <CarouselContent className="-ml-4 px-5 py-5">
          {data.map((plan) => (
            <CarouselItem
              key={plan.id}
              className="flex basis-[95%] justify-center pl-4">
              <PlanCard
                id={plan.id}
                name={plan.name}
                data={
                  plan.dataAmountMb === 0
                    ? "무제한"
                    : `${(plan.dataAmountMb / 1024).toFixed(1)}GB`
                }
                voice={
                  plan.voiceMinutes === -1 ? "무제한" : `${plan.voiceMinutes}분`
                }
                sms={plan.smsIncluded ? "포함" : "없음"}
                price={`월 ${plan.price.toLocaleString()}원`}
                tel={plan.networkType}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
