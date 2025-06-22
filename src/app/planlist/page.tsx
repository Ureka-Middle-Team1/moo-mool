"use client";

import { useEffect, useRef, useState } from "react";
import { SortTarget } from "@/types/sort";
import { PrismaNetworkType, UINetworkType } from "@/types/network";
import StickySortFilter from "@/components/planList/StickySortFilter";
import PlanListCard from "@/components/planList/PlanListCard";
import PlanListCardSkeleton from "@/components/skeleton/PlanListCardSkeleton";
import { useInfinitePlans } from "@/hooks/useInfinitePlans";
import { getScoreContext } from "@/utils/planScore";
import PlanListTrigger from "@/components/planList/PlanListTrigger";
import { PlanDBApiResponse } from "@/types/PlanData";
import HomeHeader from "@/components/home/HomeHeader";
import TopGradient from "@/components/planDetail/TopGradient";
import { OTTType } from "@/components/planList/SortFilterPanel";
import HamburgerMenu from "@/components/common/HamburgerMenu";

export default function PlanListPage() {
  const listRef = useRef<HTMLDivElement>(null);

  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedNetwork, setSelectedNetwork] = useState<UINetworkType | null>(
    null
  );
  const [selectedOttList, setSelectedOttList] = useState<OTTType[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinitePlans(sortTarget, sortOrder, selectedNetwork, selectedOttList);

  const planMap = new Map<number, PlanDBApiResponse>();
  data?.pages.forEach((page) => {
    page.data.forEach((plan) => {
      planMap.set(plan.id, plan);
    });
  });
  const allPlans = Array.from(planMap.values());
  const scoreContext = allPlans.length > 0 ? getScoreContext(allPlans) : null;

  useEffect(() => {
    if (!data || data.pages.length === 1) {
      listRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50" ref={listRef}>
      <TopGradient />
      <section className="z-1 flex h-[90%] w-[90%] flex-col items-center">
        <HomeHeader />
        <StickySortFilter
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortTarget={sortTarget}
          setSortTarget={setSortTarget}
          selectedOttList={selectedOttList}
          setSelectedOttList={setSelectedOttList}
        />

        <div className="flex flex-col items-center space-y-4">
          {status === "pending" || !scoreContext
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full max-w-xs">
                  <PlanListCardSkeleton />
                </div>
              ))
            : allPlans.map((plan) => (
                <PlanListCard key={plan.id} plan={plan} />
              ))}
        </div>

        {/* ✅ 무한스크롤 하단 로딩용 Skeleton */}
        {isFetchingNextPage && (
          <div className="mt-6 flex flex-col items-center space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="w-full max-w-xs">
                <PlanListCardSkeleton />
              </div>
            ))}
          </div>
        )}

        <PlanListTrigger
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </div>
  );
}
