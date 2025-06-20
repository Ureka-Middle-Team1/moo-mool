"use client";

import PlanListCard from "../planList/PlanListCard";
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
              <PlanListCard
                plan={{
                  id: plan.id,
                  name: plan.name,
                  price: plan.price,
                  dataAmountMb: plan.dataAmountMb,
                  overageSpeedMbps: plan.overageSpeedMbps,
                  voiceMinutes: plan.voiceMinutes,
                  smsIncluded: plan.smsIncluded,
                  networkType: plan.networkType,
                  subscriptionServices: plan.subscriptionServices || [],
                }}
                hideBenefits={true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
