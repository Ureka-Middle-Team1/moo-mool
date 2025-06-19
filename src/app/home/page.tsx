"use client";
export const dynamic = "force-dynamic";
import { Suspense, useState } from "react";
import HomeHeader from "@/components/home/HomeHeader";
import HomeRecommendedPlan from "@/components/home/HomeRecommendedPlan";
import PopularPlansList from "@/components/home/PopularPlansList";
import UserTendencyRadar from "@/components/home/UserTendencyRadar";
import TopGradient from "@/components/planDetail/TopGradient";
import MyPageModal from "@/components/myPage/MyPageModal";
import { useSession } from "next-auth/react";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import ChatHistoryList from "@/components/home/ChatHistoryList";
import FeatureBannerSlider from "@/components/home/FeatureBannerSlider";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: userInfo, isLoading: userLoading } = useGetUserInfo(
    userId ?? ""
  );

  return (
    <div className="flex flex-col items-center">
      <TopGradient />
      <section className="z-1 flex h-[85%] w-[90%] flex-col items-center">
        <Suspense fallback={<div>성향 불러오는 중...</div>}>
          <HomeHeader onAvatarClick={() => setIsModalOpen(true)} />
        </Suspense>
        {/* 마이페이지 Modal */}
        <MyPageModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        <div className="flex w-full flex-col gap-7 px-3 py-5">
          <FeatureBannerSlider />

          <div className="flex w-full flex-col gap-3">
            <h2 className="pl-1 text-lg font-semibold text-gray-900">
              {userInfo?.name}님의 콘텐츠 성향은?
            </h2>
            {/*  Suspense로 감싸기 */}
            <Suspense fallback={<div>성향 분석 불러오는 중...</div>}>
              <UserTendencyRadar />
            </Suspense>
          </div>

          {/* Suspense로 감싸기 */}
          <Suspense fallback={<div>추천 요금제 불러오는 중...</div>}>
            <HomeRecommendedPlan />
          </Suspense>

          <div className="flex w-full flex-col">
            <h2 className="pl-1 text-lg font-semibold text-gray-900">
              요즘 뜨는 요금제
            </h2>
            <PopularPlansList />
          </div>

          <div className="flex w-full flex-col">
            <h2 className="pl-1 text-lg font-semibold text-gray-900">
              최근 대화내역
            </h2>
            <ChatHistoryList />
          </div>
        </div>
      </section>
    </div>
  );
}
