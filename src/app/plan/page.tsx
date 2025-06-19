"use client";

import { useEffect, useRef, useState } from "react";
import { SortTarget } from "@/types/sort";
import { PrismaNetworkType, UINetworkType } from "@/types/network";
import SortFilterPanel from "@/components/planList/SortFilterPanel";
import PlanListCard from "@/components/planList/PlanListCard";
import { useInfinitePlans } from "@/hooks/useInfinitePlans";
import { getScoreContext } from "@/utils/planScore";
import PlanListTrigger from "@/components/planList/PlanListTrigger";

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

  const allPlans = data?.pages.flat() ?? [];
  const scoreContext = allPlans.length > 0 ? getScoreContext(allPlans) : null;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

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

  const mappedNetwork = getEnumNetworkType(selectedNetwork);
  let filteredPlans = allPlans;
  if (mappedNetwork) {
    filteredPlans = filteredPlans.filter(
      (plan) => plan.networkType === mappedNetwork
    );
  }

  const sortedPlans = sortTarget
    ? [...filteredPlans].sort((a, b) => {
        if (sortTarget === "subscriptionServices") {
          const aLen = Array.isArray(a.subscriptionServices)
            ? a.subscriptionServices.length
            : 0;
          const bLen = Array.isArray(b.subscriptionServices)
            ? b.subscriptionServices.length
            : 0;
          return sortOrder === "asc" ? aLen - bLen : bLen - aLen;
        }
        const aVal = a[sortTarget] as number | null;
        const bVal = b[sortTarget] as number | null;
        return sortOrder === "asc"
          ? (aVal ?? 0) - (bVal ?? 0)
          : (bVal ?? 0) - (aVal ?? 0);
      })
    : filteredPlans;

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
        {sortedPlans.map((plan) => (
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
