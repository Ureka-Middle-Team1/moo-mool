"use client";

import { useEffect, useRef, useState } from "react";
import { SortTarget } from "@/types/sort";
import { PrismaNetworkType, UINetworkType } from "@/types/network";
import StickySortFilter from "@/components/planList/StickySortFilter";
import PlanListCard from "@/components/planList/PlanListCard";
import { useInfinitePlans } from "@/hooks/useInfinitePlans";
import { getScoreContext } from "@/utils/planScore";
import PlanListTrigger from "@/components/planList/PlanListTrigger";
import { PlanDBApiResponse } from "@/types/PlanData";
import HomeHeader from "@/components/home/HomeHeader";
import TopGradient from "@/components/planDetail/TopGradient";
import { OTTType } from "@/components/planList/SortFilterPanel";
import MyPageModal from "@/components/myPage/MyPageModal";
import { useModalStore } from "@/store/useModalStore";

const getEnumNetworkType = (
  type: UINetworkType | null
): PrismaNetworkType | null => {
  if (type === "5G") return "FIVE_G";
  if (type === "LTE") return "LTE";
  return null;
};

export default function PlanListPage() {
  const { isModalOpen, setModalOpen, openModal } = useModalStore();
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
    <div className="flex flex-col items-center" ref={listRef}>
      <TopGradient />
      <section className="z-1 flex h-[90%] w-[90%] flex-col items-center">
        <HomeHeader onAvatarClick={openModal} />
        {/* 마이페이지 Modal */}
        <MyPageModal open={isModalOpen} onOpenChange={setModalOpen} />
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
      </section>
    </div>
  );
}
