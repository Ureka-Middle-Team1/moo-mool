"use client";

import { useEffect, useRef, useState } from "react";
import { SortTarget } from "@/types/sort";
import { PrismaNetworkType, UINetworkType } from "@/types/network";
import SortFilterPanel from "@/components/planList/SortFilterPanel";
import PlanListCard from "@/components/planList/PlanListCard";
import { useInfinitePlans } from "@/hooks/useInfinitePlans";
import { getScoreContext } from "@/utils/planScore";
import PlanListTrigger from "@/components/planList/PlanListTrigger";
import { PlanDBApiResponse } from "@/types/PlanData";

const getEnumNetworkType = (
  type: UINetworkType | null
): PrismaNetworkType | null => {
  if (type === "5G") return "FIVE_G";
  if (type === "LTE") return "LTE";
  return null;
};

export default function PlanListPage() {
  const listRef = useRef<HTMLDivElement>(null);

  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedNetwork, setSelectedNetwork] = useState<UINetworkType | null>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinitePlans(sortTarget, sortOrder, selectedNetwork);

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

  if (status === "pending" || !scoreContext) {
    return (
      <div className="space-y-4 p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[120px] w-full animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative space-y-6 bg-gradient-to-r from-pink-100 to-yellow-100 p-4"
      ref={listRef}>
      <img
        src="/assets/icons/logo.png"
        alt="로고"
        className="absolute top-4 left-4 h-16 w-auto drop-shadow-md"
      />
      <div className="mt-18" />
      <SortFilterPanel
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortTarget={sortTarget}
        setSortTarget={setSortTarget}
      />

      <div className="space-y-4">
        {allPlans.map((plan) => (
          <PlanListCard key={plan.id} plan={plan} />
        ))}
      </div>

      <PlanListTrigger
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
